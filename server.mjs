import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLessons, publicLesson } from './src/content.mjs';
import { loadCourses, courseSummary, plannedLessonIds, buildCourseSyllabus, validateLessonCatalog } from './src/courses.mjs';
import { createDb, getProgressMap, setProgress } from './src/db.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(ROOT, 'public');
const LESSONS = path.join(ROOT, 'content', 'lessons');
const COURSES = path.join(ROOT, 'content', 'courses');
const DB_PATH = path.join(ROOT, 'data', 'learning.sqlite');
const BASE_CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'app.config.json'), 'utf8'));
const db = createDb(DB_PATH);
const PORT = Number(process.env.PORT || 4173);

function loadCatalog() { return loadCourses(COURSES); }
function configFor(courses) { return { ...BASE_CONFIG, courses: courses.map(c => courseSummary(c, { includeModules: true })) }; }
function loadAll(courses = loadCatalog()) { const lessons = loadLessons(LESSONS, plannedLessonIds(courses)); validateLessonCatalog(courses, lessons); return lessons; }
function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Content-Length': Buffer.byteLength(body), 'Cache-Control': 'no-store' });
  res.end(body);
}
function fail(res, status, message) { json(res, status, { error: message }); }
async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw new Error('Invalid JSON body'); }
}
function lessonById(id) { const courses = loadCatalog(); return loadAll(courses).find(l => l.meta.id === id); }
function statusForPercent(p) { return p >= 100 ? 'completed' : p > 0 ? 'in-progress' : 'not-started'; }
function courseById(id, courses = loadCatalog()) { return courses.find(c => c.id === id) || { id, label: id, code: id.toUpperCase(), track: 'Curriculum' }; }
function lessonLocked(meta, progress) { return (meta.prerequisites || []).some(id => (progress[id]?.percent || 0) < 100); }

function getTaskMap() {
  const rows = db.prepare('SELECT lesson_id, task_id, done, updated_at FROM task_state').all();
  return Object.fromEntries(rows.map(r => [`${r.lesson_id}::${r.task_id}`, { done: !!r.done, updatedAt: r.updated_at }]));
}
function getActivityMap() {
  const rows = db.prepare('SELECT lesson_id, activity_id, activity_type, done, updated_at FROM practice_state').all();
  return Object.fromEntries(rows.map(r => [`${r.lesson_id}::${r.activity_type}::${r.activity_id}`, { done: !!r.done, updatedAt: r.updated_at }]));
}
function getQuizMap() {
  const rows = db.prepare(`
    SELECT lesson_id, quiz_id, COUNT(*) attempts,
      MAX(CASE WHEN correct = 1 THEN 1 ELSE 0 END) passed,
      MAX(CASE WHEN correct IS NULL THEN 1 ELSE 0 END) self_assessed,
      MAX(created_at) last_attempt
    FROM quiz_attempts
    GROUP BY lesson_id, quiz_id
  `).all();
  return Object.fromEntries(rows.map(r => [`${r.lesson_id}::${r.quiz_id}`, {
    attempts: Number(r.attempts || 0), passed: !!r.passed, selfAssessed: !!r.self_assessed, lastAttempt: r.last_attempt
  }]));
}

function buildPractice(lessons, progress, courses = loadCatalog()) {
  const taskMap = getTaskMap();
  const activityMap = getActivityMap();
  const quizMap = getQuizMap();
  const items = [];
  const defaults = { quiz: 10, task: 15, exercise: 40, lab: 90 };
  for (const lesson of lessons) {
    const locked = lessonLocked(lesson.meta, progress);
    const course = courseById(lesson.meta.course, courses);
    for (const block of lesson.blocks) {
      if (!['quiz', 'task', 'exercise', 'lab'].includes(block.type)) continue;
      const d = block.data;
      let done = false, attempts = 0, review = false;
      if (block.type === 'task') done = !!taskMap[`${lesson.meta.id}::${d.id}`]?.done;
      if (block.type === 'exercise' || block.type === 'lab') done = !!activityMap[`${lesson.meta.id}::${block.type}::${d.id}`]?.done;
      if (block.type === 'quiz') {
        const q = quizMap[`${lesson.meta.id}::${d.id}`] || { attempts: 0, passed: false, selfAssessed: false };
        attempts = q.attempts;
        done = q.passed || q.selfAssessed;
        review = q.attempts > 0 && !done;
      }
      items.push({
        id: d.id,
        type: block.type,
        lessonId: lesson.meta.id,
        lessonTitle: lesson.meta.title,
        courseId: lesson.meta.course,
        courseCode: course.code,
        courseLabel: course.label,
        module: lesson.meta.module,
        order: lesson.meta.order,
        title: d.title || (block.type === 'quiz' ? 'Knowledge check' : block.type === 'task' ? 'Lesson task' : block.type),
        brief: d.brief || d.detail || d.prompt || '',
        difficulty: d.difficulty || null,
        estimatedMinutes: Number(d.estimatedMinutes || defaults[block.type]),
        done,
        locked,
        attempts,
        review,
      });
    }
  }
  const priority = { quiz: 0, task: 1, exercise: 2, lab: 3 };
  items.sort((a,b) => Number(a.locked)-Number(b.locked) || Number(a.done)-Number(b.done) || Number(b.review)-Number(a.review) || a.order-b.order || priority[a.type]-priority[b.type]);
  const available = items.filter(x => !x.locked);
  return {
    items,
    stats: {
      total: items.length,
      pending: available.filter(x => !x.done).length,
      complete: items.filter(x => x.done).length,
      reviews: available.filter(x => x.review).length,
      quizzes: items.filter(x => x.type === 'quiz').length,
      exercises: items.filter(x => x.type === 'exercise').length,
      labs: items.filter(x => x.type === 'lab').length,
      tasks: items.filter(x => x.type === 'task').length,
    }
  };
}

function buildToday(lessons, progress, courses = loadCatalog()) {
  const practice = buildPractice(lessons, progress, courses);
  const availableLessons = lessons.filter(l => !lessonLocked(l.meta, progress) && (progress[l.meta.id]?.percent || 0) < 100);
  const current = availableLessons.find(l => (progress[l.meta.id]?.percent || 0) > 0) || availableLessons[0] || null;
  const plan = [];
  if (current) {
    const p = progress[current.meta.id]?.percent || 0;
    plan.push({
      kind: 'lesson', type: 'lesson', id: current.meta.id, lessonId: current.meta.id,
      courseId: current.meta.course, courseCode: courseById(current.meta.course, courses).code,
      title: current.meta.title, subtitle: current.meta.module,
      estimatedMinutes: Math.max(15, Math.round(current.meta.estimatedMinutes * Math.max(.25, 1 - p / 100))),
      progress: p, action: p ? 'Continue lesson' : 'Start lesson'
    });
  }
  const pending = practice.items.filter(x => !x.locked && !x.done);
  const pick = (predicate) => pending.find(x => predicate(x) && !plan.some(p => p.type === x.type && p.id === x.id && p.lessonId === x.lessonId));
  const review = pick(x => x.type === 'quiz' && x.review);
  const knowledge = pick(x => x.type === 'quiz' && (!current || x.lessonId === current.meta.id)) || pick(x => x.type === 'quiz');
  const work = pick(x => ['exercise','lab','task'].includes(x.type) && (!current || x.lessonId === current.meta.id)) || pick(x => ['exercise','lab','task'].includes(x.type));
  for (const item of [review, knowledge, work]) {
    if (!item || plan.some(p => p.type === item.type && p.id === item.id && p.lessonId === item.lessonId)) continue;
    plan.push({ ...item, kind: item.review ? 'review' : item.type, subtitle: `${item.courseCode} · ${item.module}`, action: item.review ? 'Review mistake' : item.type === 'quiz' ? 'Knowledge check' : item.type === 'task' ? 'Personal work' : item.type === 'lab' ? 'Engineering lab' : 'Exercise' });
  }
  return {
    current: current ? current.meta : null,
    plan: plan.slice(0, 4),
    totalMinutes: plan.slice(0,4).reduce((s,x)=>s+(x.estimatedMinutes || 0),0),
    practice: practice.stats,
  };
}

function dashboard(lessons, progress, courses = loadCatalog()) {
  const metas = lessons.map(l => l.meta);
  const completed = metas.filter(m => progress[m.id]?.percent === 100).length;
  const started = metas.filter(m => (progress[m.id]?.percent || 0) > 0).length;
  const overall = metas.length ? Math.round(metas.reduce((sum,m) => sum + (progress[m.id]?.percent || 0), 0) / metas.length) : 0;
  const practice = buildPractice(lessons, progress, courses);
  const courseProgress = courses.map(course => {
    const group = metas.filter(m => m.course === course.id);
    const planned = course.modules.flatMap(m => m.plannedLessons);
    const percent = planned.length ? Math.round(planned.reduce((sum,m) => sum + (progress[m.id]?.percent || 0), 0) / planned.length) : 0;
    const unlocked = group.filter(m => !lessonLocked(m, progress));
    const current = unlocked.find(m => (progress[m.id]?.percent || 0) > 0 && (progress[m.id]?.percent || 0) < 100) || unlocked.find(m => (progress[m.id]?.percent || 0) < 100) || null;
    const courseWork = practice.items.filter(x => x.courseId === course.id && !x.locked);
    return { ...courseSummary(course), lessons: planned.length, writtenLessons: group.length, modules: course.modules.length, percent, current, pendingPractice: courseWork.filter(x=>!x.done).length };
  });
  return { completed, started, total: metas.length, overall, courseProgress, practice: practice.stats };
}

async function api(req, res, url) {
  const method = req.method || 'GET';
  const courses = loadCatalog();
  const CONFIG = configFor(courses);
  if (method === 'GET' && url.pathname === '/api/bootstrap') {
    const lessons = loadAll(courses); const progress = getProgressMap(db);
    return json(res, 200, { config: CONFIG, lessons: lessons.map(l => l.meta), progress, dashboard: dashboard(lessons, progress, courses) });
  }
  if (method === 'GET' && url.pathname === '/api/today') {
    const lessons = loadAll(courses); const progress = getProgressMap(db);
    return json(res, 200, buildToday(lessons, progress, courses));
  }
  if (method === 'GET' && url.pathname === '/api/practice') {
    const lessons = loadAll(courses); const progress = getProgressMap(db);
    return json(res, 200, buildPractice(lessons, progress, courses));
  }
  if (method === 'GET' && url.pathname.startsWith('/api/course/')) {
    const id = decodeURIComponent(url.pathname.slice('/api/course/'.length));
    const course = courses.find(c => c.id === id); if (!course) return fail(res, 404, 'Course not found');
    const all = loadAll(courses); const progress = getProgressMap(db); const lessons = all.filter(l => l.meta.course === id);
    const planned = course.modules.flatMap(m => m.plannedLessons);
    const pct = planned.length ? Math.round(planned.reduce((sum,m)=>sum+(progress[m.id]?.percent||0),0)/planned.length) : 0;
    const current = lessons.filter(l=>!lessonLocked(l.meta,progress)).find(l=>(progress[l.meta.id]?.percent||0)>0 && (progress[l.meta.id]?.percent||0)<100)
      || lessons.filter(l=>!lessonLocked(l.meta,progress)).find(l=>(progress[l.meta.id]?.percent||0)<100) || null;
    const practice = buildPractice(all, progress, courses); const coursePractice = practice.items.filter(x => x.courseId === id);
    const syllabus = buildCourseSyllabus(course, lessons, progress, lessonLocked);
    return json(res, 200, {
      course: courseSummary(course),
      lessons: lessons.map(l => ({ ...l.meta, locked: lessonLocked(l.meta, progress), progress: progress[l.meta.id] || {percent:0,status:'not-started'} })),
      syllabus,
      stats: { percent: pct, lessonCount: planned.length, writtenLessonCount: lessons.length, completed: planned.filter(l=>(progress[l.id]?.percent||0)===100).length, modules: course.modules.length, pendingPractice: coursePractice.filter(x=>!x.locked&&!x.done).length },
      current: current?.meta || null,
      practice: coursePractice,
    });
  }
  if (method === 'GET' && url.pathname === '/api/validate') {
    try { const lessons = loadAll(courses); const courseIds = new Set(courses.map(c=>c.id)); for (const lesson of lessons) if (!courseIds.has(lesson.meta.course)) throw new Error(`${lesson.filePath}: course "${lesson.meta.course}" does not exist`); return json(res, 200, { ok: true, courseCount: courses.length, plannedLessonCount: [...plannedLessonIds(courses)].length, writtenLessonCount: lessons.length, courses: courses.map(c=>({id:c.id,code:c.code,label:c.label})), lessons: lessons.map(l => ({id:l.meta.id,title:l.meta.title})) }); }
    catch (error) { return json(res, 422, { ok: false, error: error.message }); }
  }
  if (method === 'GET' && url.pathname.startsWith('/api/lesson/')) {
    const id = decodeURIComponent(url.pathname.slice('/api/lesson/'.length));
    const lesson = lessonById(id); if (!lesson) return fail(res, 404, 'Lesson not found');
    const progress = getProgressMap(db)[id] || null;
    const note = db.prepare('SELECT body, updated_at FROM notes WHERE lesson_id = ?').get(id) || { body: '', updated_at: null };
    const tasks = db.prepare('SELECT task_id, done FROM task_state WHERE lesson_id = ?').all(id);
    const work = db.prepare('SELECT activity_id, activity_type, done FROM practice_state WHERE lesson_id = ?').all(id);
    return json(res, 200, { lesson: publicLesson(lesson), progress, note,
      tasks: Object.fromEntries(tasks.map(t => [t.task_id, !!t.done])),
      activities: Object.fromEntries(work.map(t => [`${t.activity_type}::${t.activity_id}`, !!t.done]))
    });
  }
  if (method === 'POST' && url.pathname === '/api/progress') {
    const body = await readJson(req); const lesson = lessonById(body.lessonId);
    if (!lesson) return fail(res, 404, 'Lesson not found');
    const percent = Math.max(0, Math.min(100, Number(body.percent) || 0));
    const row = setProgress(db, lesson.meta.id, percent, body.status || statusForPercent(percent));
    return json(res, 200, { progress: row });
  }
  if (method === 'POST' && url.pathname === '/api/quiz') {
    const body = await readJson(req); const lesson = lessonById(body.lessonId);
    if (!lesson) return fail(res, 404, 'Lesson not found');
    const block = lesson.blocks.find(b => b.type === 'quiz' && b.data.id === body.quizId);
    if (!block) return fail(res, 404, 'Quiz not found');
    const expected = block.data.answer;
    const isFreeResponse = block.data.type === 'free-response';
    const correct = isFreeResponse ? null : (Array.isArray(expected)
      ? JSON.stringify([...expected].sort()) === JSON.stringify([...(Array.isArray(body.answer) ? body.answer : [])].sort())
      : String(body.answer).trim().toLowerCase() === String(expected).trim().toLowerCase());
    db.prepare('INSERT INTO quiz_attempts (lesson_id, quiz_id, answer_json, correct, created_at) VALUES (?, ?, ?, ?, ?)')
      .run(body.lessonId, body.quizId, JSON.stringify(body.answer ?? null), correct === null ? null : (correct ? 1 : 0), new Date().toISOString());
    return json(res, 200, { correct, selfAssess: isFreeResponse, modelAnswer: isFreeResponse ? expected : undefined, explanation: block.data.explanation || null });
  }
  if (method === 'POST' && url.pathname === '/api/task') {
    const body = await readJson(req); const lesson = lessonById(body.lessonId);
    if (!lesson) return fail(res, 404, 'Lesson not found');
    const block = lesson.blocks.find(b => b.type === 'task' && b.data.id === body.taskId);
    if (!block) return fail(res, 404, 'Task not found');
    const now = new Date().toISOString();
    db.prepare(`INSERT INTO task_state (lesson_id, task_id, done, updated_at) VALUES (?, ?, ?, ?)
      ON CONFLICT(lesson_id, task_id) DO UPDATE SET done=excluded.done, updated_at=excluded.updated_at`)
      .run(body.lessonId, body.taskId, body.done ? 1 : 0, now);
    return json(res, 200, { ok: true });
  }
  if (method === 'POST' && url.pathname === '/api/activity') {
    const body = await readJson(req); const lesson = lessonById(body.lessonId);
    if (!lesson) return fail(res, 404, 'Lesson not found');
    if (!['exercise','lab'].includes(body.type)) return fail(res, 422, 'Unsupported activity type');
    const block = lesson.blocks.find(b => b.type === body.type && b.data.id === body.activityId);
    if (!block) return fail(res, 404, 'Activity not found');
    const now = new Date().toISOString();
    db.prepare(`INSERT INTO practice_state (lesson_id, activity_id, activity_type, done, updated_at) VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(lesson_id, activity_type, activity_id) DO UPDATE SET done=excluded.done, updated_at=excluded.updated_at`)
      .run(body.lessonId, body.activityId, body.type, body.done ? 1 : 0, now);
    return json(res, 200, { ok: true });
  }
  if (method === 'POST' && url.pathname === '/api/note') {
    const body = await readJson(req); if (!lessonById(body.lessonId)) return fail(res, 404, 'Lesson not found');
    const now = new Date().toISOString();
    db.prepare(`INSERT INTO notes (lesson_id, body, updated_at) VALUES (?, ?, ?)
      ON CONFLICT(lesson_id) DO UPDATE SET body=excluded.body, updated_at=excluded.updated_at`).run(body.lessonId, String(body.body || ''), now);
    return json(res, 200, { ok: true, updatedAt: now });
  }
  if (method === 'GET' && url.pathname === '/api/record') {
    const lessons = loadAll(courses); const progress = getProgressMap(db); const practice = buildPractice(lessons, progress, courses);
    const attempts = db.prepare('SELECT COUNT(*) attempts, SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) correct FROM quiz_attempts').get();
    const notes = db.prepare('SELECT COUNT(*) count FROM notes WHERE length(trim(body)) > 0').get();
    return json(res, 200, { progress, practice: practice.stats, quiz: { attempts: Number(attempts.attempts || 0), correct: Number(attempts.correct || 0) }, notes: Number(notes.count || 0) });
  }
  return fail(res, 404, 'API route not found');
}

const MIME = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.ico':'image/x-icon' };
function serveStatic(res, pathname) {
  const safePath = pathname === '/' ? '/index.html' : pathname;
  const file = path.normalize(path.join(PUBLIC, safePath));
  if (!file.startsWith(PUBLIC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return false;
  const data = fs.readFileSync(file); res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Content-Length': data.length }); res.end(data); return true;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    if (url.pathname.startsWith('/content/assets/')) {
      const rel = url.pathname.slice('/content/assets/'.length); const file = path.normalize(path.join(ROOT, 'content', 'assets', rel));
      if (!file.startsWith(path.join(ROOT, 'content', 'assets')) || !fs.existsSync(file)) return fail(res, 404, 'Asset not found');
      const data = fs.readFileSync(file); res.writeHead(200, {'Content-Type': MIME[path.extname(file)] || 'application/octet-stream'}); return res.end(data);
    }
    if (serveStatic(res, url.pathname)) return;
    serveStatic(res, '/index.html');
  } catch (error) {
    console.error(error); fail(res, 500, error.message || 'Internal server error');
  }
});
server.listen(PORT, '127.0.0.1', () => console.log(`AXIOM running at http://127.0.0.1:${PORT}`));
