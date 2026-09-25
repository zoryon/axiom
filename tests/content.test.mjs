import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLessons, parseFrontmatter, parseBody } from '../src/content.mjs';
import { loadCourses, plannedLessonIds, validateLessonCatalog } from '../src/courses.mjs';
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

test('all bundled course files parse and planned IDs are unique', () => {
  const courses = loadCourses(path.join(root, 'content', 'courses'));
  assert.equal(courses.length, 11);
  assert.equal(plannedLessonIds(courses).size, 300);
  assert.equal(new Set(courses.map(x=>x.id)).size, courses.length);
});

test('written lessons, when present, must align with the course catalog', () => {
  const courses = loadCourses(path.join(root, 'content', 'courses'));
  const lessons = loadLessons(path.join(root, 'content', 'lessons'), plannedLessonIds(courses));
  assert.doesNotThrow(()=>validateLessonCatalog(courses, lessons));
});

test('frontmatter is strict JSON', () => {
  const source = `---\n{"schemaVersion":1,"id":"x"}\n---\n# Hi`;
  const { meta, body } = parseFrontmatter(source);
  assert.equal(meta.id, 'x'); assert.match(body, /# Hi/);
});

test('structured blocks parse as data', () => {
  const blocks = parseBody('```task\n{"id":"t1","title":"Do it"}\n```');
  assert.equal(blocks[0].type, 'task'); assert.equal(blocks[0].data.id, 't1');
});
