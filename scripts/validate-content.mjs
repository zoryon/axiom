import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadLessons } from '../src/content.mjs';
import { loadCourses, plannedLessonIds, validateLessonCatalog } from '../src/courses.mjs';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
try {
  const courses = loadCourses(path.join(root, 'content', 'courses'));
  const lessons = loadLessons(path.join(root, 'content', 'lessons'), plannedLessonIds(courses));
  validateLessonCatalog(courses, lessons);
  const planned = [...plannedLessonIds(courses)].length;
  console.log(`✓ ${courses.length} course file(s) valid`);
  console.log(`✓ ${planned} planned lesson id(s) valid`);
  console.log(`✓ ${lessons.length} written lesson file(s) valid`);
  for (const course of courses) console.log(`  ${course.code} — ${course.label}`);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exitCode = 1;
}
