import fs from 'node:fs';
import path from 'node:path';

const REQUIRED = ['schemaVersion', 'id', 'title', 'course', 'module', 'order', 'estimatedMinutes', 'objectives'];
const STRUCTURED = new Set(['quiz', 'exercise', 'lab', 'callout', 'task', 'math', 'memory']);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function parseFrontmatter(source, file = '<memory>') {
  const normalized = source.replace(/\r\n/g, '\n');
  assert(normalized.startsWith('---\n'), `${file}: lesson must start with ---`);
  const end = normalized.indexOf('\n---\n', 4);
  assert(end !== -1, `${file}: missing closing --- for JSON frontmatter`);
  const rawMeta = normalized.slice(4, end).trim();
  let meta;
  try { meta = JSON.parse(rawMeta); }
  catch (error) { throw new Error(`${file}: invalid JSON frontmatter: ${error.message}`); }
  return { meta, body: normalized.slice(end + 5) };
}

export function validateMeta(meta, file = '<memory>') {
  for (const key of REQUIRED) assert(meta[key] !== undefined, `${file}: missing required metadata field "${key}"`);
  assert(meta.schemaVersion === 1, `${file}: unsupported schemaVersion ${meta.schemaVersion}; expected 1`);
  assert(/^[a-z0-9][a-z0-9._-]*$/.test(meta.id), `${file}: id must be stable kebab/dot style`);
  assert(typeof meta.title === 'string' && meta.title.trim(), `${file}: title must be non-empty`);
  assert(typeof meta.course === 'string' && meta.course.trim(), `${file}: course must be a string`);
  assert(typeof meta.module === 'string' && meta.module.trim(), `${file}: module must be a string`);
  assert(Number.isFinite(meta.order), `${file}: order must be a number`);
  assert(Number.isFinite(meta.estimatedMinutes) && meta.estimatedMinutes > 0, `${file}: estimatedMinutes must be > 0`);
  assert(Array.isArray(meta.objectives) && meta.objectives.length > 0, `${file}: objectives must be a non-empty array`);
  assert(!meta.prerequisites || Array.isArray(meta.prerequisites), `${file}: prerequisites must be an array`);
  return meta;
}

function parseStructured(lang, raw, file) {
  let value;
  try { value = JSON.parse(raw.trim()); }
  catch (error) { throw new Error(`${file}: invalid JSON in \`\`\`${lang} block: ${error.message}`); }
  if (['quiz', 'exercise', 'lab', 'task'].includes(lang)) {
    assert(value.id && typeof value.id === 'string', `${file}: ${lang} block requires a stable id`);
  }
  if (lang === 'quiz') {
    assert(value.prompt, `${file}: quiz ${value.id} requires prompt`);
    assert(['single-choice','multiple-choice','free-response'].includes(value.type), `${file}: quiz ${value.id} has unsupported type`);
    if (value.type !== 'free-response') assert(Array.isArray(value.options) && value.options.length >= 2, `${file}: quiz ${value.id} requires options`);
    assert(value.answer !== undefined, `${file}: quiz ${value.id} requires answer`);
  }
  return value;
}

function isTableDivider(line) {
  return /^\s*\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line);
}

function splitTableRow(line) {
  let s = line.trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map(v => v.trim());
}

export function parseBody(body, file = '<memory>') {
  const lines = body.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const fence = line.match(/^```([\w-]*)\s*$/);
    if (fence) {
      const lang = fence[1] || 'text';
      const start = ++i;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) i++;
      assert(i < lines.length, `${file}: unclosed code fence starting at line ${start + 1}`);
      const raw = lines.slice(start, i).join('\n');
      i++;
      if (STRUCTURED.has(lang)) blocks.push({ type: lang, data: parseStructured(lang, raw, file) });
      else blocks.push({ type: 'code', language: lang, code: raw });
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) { blocks.push({ type: 'heading', level: heading[1].length, text: heading[2].trim() }); i++; continue; }
    if (/^---+$/.test(line.trim())) { blocks.push({ type: 'rule' }); i++; continue; }

    if (line.includes('|') && i + 1 < lines.length && isTableDivider(lines[i + 1])) {
      const headers = splitTableRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim()) rows.push(splitTableRow(lines[i++]));
      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*]\s+/, '').trim());
      blocks.push({ type: 'list', ordered: false, items });
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+\.\s+/, '').trim());
      blocks.push({ type: 'list', ordered: true, items });
      continue;
    }
    if (/^>\s?/.test(line)) {
      const chunks = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) chunks.push(lines[i++].replace(/^>\s?/, ''));
      blocks.push({ type: 'quote', text: chunks.join(' ') });
      continue;
    }

    const paragraph = [line.trim()];
    i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,4})\s+/.test(lines[i]) && !/^```/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+\.\s+/.test(lines[i]) && !/^>\s?/.test(lines[i]) && !/^---+$/.test(lines[i].trim())) {
      if (lines[i].includes('|') && i + 1 < lines.length && isTableDivider(lines[i + 1])) break;
      paragraph.push(lines[i].trim()); i++;
    }
    blocks.push({ type: 'paragraph', text: paragraph.join(' ') });
  }
  return blocks;
}

export function parseLessonFile(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');
  const { meta, body } = parseFrontmatter(source, filePath);
  validateMeta(meta, filePath);
  const blocks = parseBody(body, filePath);
  const ids = new Set();
  for (const block of blocks) {
    if (block.data?.id) {
      assert(!ids.has(block.data.id), `${filePath}: duplicate block id "${block.data.id}"`);
      ids.add(block.data.id);
    }
  }
  return { meta, blocks, filePath };
}

function walkLessonFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkLessonFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.lesson.md')) out.push(full);
  }
  return out.sort();
}

export function loadLessons(contentDir, knownLessonIds = null) {
  if (!fs.existsSync(contentDir)) return [];
  const files = walkLessonFiles(contentDir);
  const lessons = files.map(file => parseLessonFile(file));
  const lessonIds = new Set();
  for (const lesson of lessons) {
    assert(!lessonIds.has(lesson.meta.id), `duplicate lesson id "${lesson.meta.id}"`);
    lessonIds.add(lesson.meta.id);
  }
  const validPrereqs = knownLessonIds ? new Set([...lessonIds, ...knownLessonIds]) : lessonIds;
  for (const lesson of lessons) {
    for (const prereq of lesson.meta.prerequisites || []) {
      assert(validPrereqs.has(prereq), `${lesson.filePath}: prerequisite "${prereq}" does not exist in loaded lessons or planned curriculum`);
    }
  }
  return lessons.sort((a,b) => a.meta.order - b.meta.order || a.meta.title.localeCompare(b.meta.title));
}

export function publicLesson(lesson) {
  return {
    meta: lesson.meta,
    blocks: lesson.blocks.map(block => {
      if (block.type === 'quiz') {
        const { answer, explanation, ...safe } = block.data;
        return { ...block, data: safe };
      }
      return block;
    })
  };
}
