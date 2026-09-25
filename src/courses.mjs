import fs from 'node:fs';
import path from 'node:path';

const REQUIRED = ['schemaVersion','id','code','label','track','year','term','description','outcomes','modules'];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function validateCourse(course, file = '<memory>') {
  for (const key of REQUIRED) assert(course[key] !== undefined, `${file}: missing required course field "${key}"`);
  assert(course.schemaVersion === 1, `${file}: unsupported schemaVersion ${course.schemaVersion}; expected 1`);
  assert(/^[a-z0-9][a-z0-9-]*$/.test(course.id), `${file}: course id must be kebab-case`);
  assert(typeof course.code === 'string' && course.code.trim(), `${file}: code must be non-empty`);
  assert(typeof course.label === 'string' && course.label.trim(), `${file}: label must be non-empty`);
  assert(typeof course.track === 'string' && course.track.trim(), `${file}: track must be non-empty`);
  assert(Number.isFinite(course.year) && course.year >= 1, `${file}: year must be a positive number`);
  assert(['1','2','year','self-paced'].includes(String(course.term)), `${file}: term must be 1, 2, year, or self-paced`);
  assert(typeof course.description === 'string' && course.description.trim(), `${file}: description must be non-empty`);
  assert(Array.isArray(course.outcomes) && course.outcomes.length > 0, `${file}: outcomes must be a non-empty array`);
  assert(Array.isArray(course.modules) && course.modules.length > 0, `${file}: modules must be a non-empty array`);
  assert(!course.prerequisites || Array.isArray(course.prerequisites), `${file}: prerequisites must be an array`);
  if (course.recommendedHours !== undefined) assert(Number.isFinite(course.recommendedHours) && course.recommendedHours > 0, `${file}: recommendedHours must be > 0`);

  const moduleIds = new Set();
  const lessonIds = new Set();
  for (const module of course.modules) {
    assert(module.id && /^[a-z0-9][a-z0-9-]*$/.test(module.id), `${file}: every module needs a kebab-case id`);
    assert(!moduleIds.has(module.id), `${file}: duplicate module id "${module.id}"`);
    moduleIds.add(module.id);
    assert(typeof module.title === 'string' && module.title.trim(), `${file}: module ${module.id} needs a title`);
    assert(Number.isFinite(module.order), `${file}: module ${module.id} needs numeric order`);
    assert(Array.isArray(module.plannedLessons) && module.plannedLessons.length > 0, `${file}: module ${module.id} needs plannedLessons`);
    for (const lesson of module.plannedLessons) {
      assert(lesson.id && /^[a-z0-9][a-z0-9._-]*$/.test(lesson.id), `${file}: planned lesson in ${module.id} needs a stable id`);
      assert(!lessonIds.has(lesson.id), `${file}: duplicate planned lesson id "${lesson.id}"`);
      lessonIds.add(lesson.id);
      assert(typeof lesson.title === 'string' && lesson.title.trim(), `${file}: planned lesson ${lesson.id} needs a title`);
      assert(Number.isFinite(lesson.order), `${file}: planned lesson ${lesson.id} needs numeric order`);
      assert(Number.isFinite(lesson.estimatedMinutes) && lesson.estimatedMinutes > 0, `${file}: planned lesson ${lesson.id} needs estimatedMinutes > 0`);
      assert(!lesson.prerequisites || Array.isArray(lesson.prerequisites), `${file}: planned lesson ${lesson.id} prerequisites must be an array`);
    }
  }
  return course;
}

function walkCourseFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkCourseFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.course.json')) out.push(full);
  }
  return out.sort();
}

export function loadCourses(courseDir) {
  const files = walkCourseFiles(courseDir);
  const courses = files.map(file => {
    let course;
    try { course = JSON.parse(fs.readFileSync(file, 'utf8')); }
    catch (error) { throw new Error(`${file}: invalid JSON: ${error.message}`); }
    validateCourse(course, file);
    return { ...course, filePath: file };
  });
  const courseIds = new Set();
  const plannedIds = new Set();
  for (const course of courses) {
    assert(!courseIds.has(course.id), `duplicate course id "${course.id}"`);
    courseIds.add(course.id);
    for (const module of course.modules) for (const lesson of module.plannedLessons) {
      assert(!plannedIds.has(lesson.id), `duplicate planned lesson id across courses "${lesson.id}"`);
      plannedIds.add(lesson.id);
    }
  }
  for (const course of courses) {
    for (const prereq of course.prerequisites || []) assert(courseIds.has(prereq), `${course.filePath}: course prerequisite "${prereq}" does not exist`);
    for (const module of course.modules) for (const lesson of module.plannedLessons) {
      for (const prereq of lesson.prerequisites || []) assert(plannedIds.has(prereq), `${course.filePath}: planned lesson ${lesson.id} prerequisite "${prereq}" does not exist in the course catalog`);
    }
  }
  return courses.sort((a,b) => a.year-b.year || termRank(a.term)-termRank(b.term) || (a.order ?? 999)-(b.order ?? 999) || a.code.localeCompare(b.code));
}

function termRank(term) { return term === '1' || term === 1 ? 1 : term === 'year' ? 2 : term === '2' || term === 2 ? 3 : 4; }

export function courseSummary(course, options = {}) {
  const { filePath, modules, assessments, outcomes, ...rest } = course;
  const plannedLessonCount = modules.reduce((sum,m)=>sum+m.plannedLessons.length,0);
  return { ...rest, outcomes, assessments: assessments || [], plannedLessonCount, plannedModuleCount: modules.length, ...(options.includeModules ? { modules } : {}) };
}

export function plannedLessonIds(courses) {
  return new Set(courses.flatMap(c => c.modules.flatMap(m => m.plannedLessons.map(l => l.id))));
}

export function buildCourseSyllabus(course, actualLessons, progress, isLocked) {
  const actualById = new Map(actualLessons.map(l => [l.meta.id, l]));
  return course.modules.map(module => ({
    id: module.id,
    title: module.title,
    description: module.description || '',
    order: module.order,
    lessons: module.plannedLessons.map(plan => {
      const actual = actualById.get(plan.id);
      if (!actual) return { ...plan, module: module.title, planned: true, available: false, progress: {percent:0,status:'not-started'}, locked: true };
      return { ...actual.meta, planned: false, available: true, progress: progress[actual.meta.id] || {percent:0,status:'not-started'}, locked: isLocked(actual.meta, progress) };
    })
  }));
}

export function validateLessonCatalog(courses, lessons) {
  const courseById = new Map(courses.map(c => [c.id, c]));
  const planned = new Map();
  for (const course of courses) for (const module of course.modules) for (const lesson of module.plannedLessons) {
    planned.set(lesson.id, { courseId: course.id, moduleTitle: module.title, order: lesson.order, title: lesson.title });
  }
  for (const lesson of lessons) {
    const meta = lesson.meta;
    assert(courseById.has(meta.course), `${lesson.filePath}: course "${meta.course}" does not exist`);
    const plan = planned.get(meta.id);
    assert(plan, `${lesson.filePath}: lesson id "${meta.id}" is not declared in any course syllabus`);
    assert(plan.courseId === meta.course, `${lesson.filePath}: lesson "${meta.id}" belongs to course "${plan.courseId}", not "${meta.course}"`);
    assert(plan.moduleTitle === meta.module, `${lesson.filePath}: lesson "${meta.id}" module must be "${plan.moduleTitle}"`);
    assert(plan.order === meta.order, `${lesson.filePath}: lesson "${meta.id}" order must be ${plan.order}`);
  }
  return true;
}
