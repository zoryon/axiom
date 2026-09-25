import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

export function createDb(dbPath) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  const db = new DatabaseSync(dbPath);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS lesson_progress (
      lesson_id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'not-started',
      percent INTEGER NOT NULL DEFAULT 0 CHECK(percent BETWEEN 0 AND 100),
      started_at TEXT,
      completed_at TEXT,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lesson_id TEXT NOT NULL,
      quiz_id TEXT NOT NULL,
      answer_json TEXT NOT NULL,
      correct INTEGER,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS task_state (
      lesson_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (lesson_id, task_id)
    );
    CREATE TABLE IF NOT EXISTS practice_state (
      lesson_id TEXT NOT NULL,
      activity_id TEXT NOT NULL,
      activity_type TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (lesson_id, activity_type, activity_id)
    );
    CREATE TABLE IF NOT EXISTS notes (
      lesson_id TEXT PRIMARY KEY,
      body TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS study_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lesson_id TEXT,
      minutes INTEGER NOT NULL CHECK(minutes >= 0),
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS tutor_memory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lesson_id TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT 'Tutor session',
      body TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_tutor_memory_lesson_created
      ON tutor_memory (lesson_id, created_at DESC);
  `);
  return db;
}

export function getProgressMap(db) {
  const rows = db.prepare('SELECT lesson_id, status, percent, started_at, completed_at, updated_at FROM lesson_progress').all();
  return Object.fromEntries(rows.map(row => [row.lesson_id, row]));
}

export function setProgress(db, lessonId, percent, status) {
  const now = new Date().toISOString();
  const existing = db.prepare('SELECT * FROM lesson_progress WHERE lesson_id = ?').get(lessonId);
  const started = existing?.started_at || (percent > 0 ? now : null);
  const completed = percent === 100 ? (existing?.completed_at || now) : null;
  db.prepare(`
    INSERT INTO lesson_progress (lesson_id, status, percent, started_at, completed_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(lesson_id) DO UPDATE SET
      status=excluded.status, percent=excluded.percent,
      started_at=COALESCE(lesson_progress.started_at, excluded.started_at),
      completed_at=excluded.completed_at, updated_at=excluded.updated_at
  `).run(lessonId, status, percent, started, completed, now);
  return db.prepare('SELECT * FROM lesson_progress WHERE lesson_id = ?').get(lessonId);
}
