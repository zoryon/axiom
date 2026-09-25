# AXIOM — Local Learning OS

AXIOM is a local-first learning platform for a long-form curriculum that combines university-level Computer Science, Computer Engineering, mathematics/science, and professional software engineering practice.

The application is intentionally separated into three layers:

- **Curriculum map**: `content/courses/*.course.json`
- **Lesson content**: `content/lessons/**/*.lesson.md`
- **Personal state**: `data/learning.sqlite`

Course files can define the complete syllabus before the corresponding lessons are written. Lesson files can later be expanded or revised without migrating the progress database as long as their stable IDs remain unchanged.

## Requirements

- Node.js **22.5+**
- No npm packages
- No cloud services
- No account
- No paid API

## Start

On Windows, double-click:

```text
START_AXIOM.bat
```

Or from the project folder:

```bash
npm start
```

Open:

```text
http://127.0.0.1:4173
```

## Year 01 curriculum currently included

The repository contains the full **Year 01 course/syllabus layer**, plus authored lesson content for the first two courses:

- CS-101 — C Programming I
- MATH-101 — Calculus I
- MATH-111 — Linear Algebra & Analytic Geometry
- MATH-121 — Discrete Mathematics & Logic I
- ENG-101 — Linux, Git & Developer Tools
- PHYS-101 — Physics I — Mechanics
- ENG-110 — Engineering Laboratory I
- CS-102 — C Programming II — Memory & Data Structures
- RS-101 — Rust Foundations & Safe Systems Programming
- MATH-141 — Numerical Computing I
- CE-101 — Digital Logic & Computer Organization I

Together they define **300 permanent planned lesson IDs** across the first-year syllabus.

Authored lesson content currently included:

- **CS-101 — C Programming I:** 32/32 lessons
- **MATH-101 — Calculus I:** 31/31 lessons

The remaining Year 01 courses keep their planned syllabus IDs and show `CONTENT PENDING` until their `.lesson.md` files are authored.

## How the application is organized

### Today

`Today` is the study engine. Once lesson files exist, it chooses the next unlocked lesson and combines it with available knowledge checks, reviews and personal work.

### Courses

`Courses` is the academic structure. Each course page shows:

- course outcomes and recommended workload
- planned modules and lessons
- which lesson files have actually been written
- course progress
- current lesson
- pending practice

The planned syllabus comes from `content/courses/*.course.json` and therefore exists even before lesson prose is written.

### Roadmap

Roadmap shows the full Year 01 plan by term, course, module and planned lesson. `PENDING` means the syllabus item exists but its `.lesson.md` content file has not been authored yet.

### Practice

Every structured `quiz`, `task`, `exercise` and `lab` block contained in written lesson files is automatically indexed here. Failed quizzes become review work.

### Lesson focus mode

Lesson pages are optimized for long-form study. The left sidebar can be collapsed, while private notes and status controls live in a modal workspace.

Shortcuts while reading a lesson:

- `T` — open Study with Tutor
- `N` — open Notes & Status
- `[` — collapse / expand lesson sidebar
- `Esc` — close the active lesson modal
- `Ctrl+K` — global lesson search

### Study with Tutor

Every authored lesson has a local **Tutor** workspace. AXIOM does not call an AI API and does not send data anywhere; it only prepares a context-rich prompt and copies it to the clipboard so you can paste it into ChatGPT.

Available workflows:

- **Ask Tutor** — ask about one specific confusing point without getting the whole lesson repeated.
- **Check My Understanding** — the tutor examines you one question at a time and probes misconceptions before deciding whether you are ready to move on.
- **Teach It Back** — Feynman-style mode: you explain the lesson freely and the tutor aggressively checks for errors, missing links and false confidence.
- **Review With Tutor** — available on free-response knowledge checks; it copies the question and your written answer for a deeper review.

The copied prompt includes the course, module, lesson ID, learning objectives and lesson outline.

### Library

Library contains only lesson files that have actually been authored under `content/lessons/`.

### Record

Record reads SQLite and computes progress against the planned curriculum, while practice and quiz history come from written lessons.

## Curriculum files

Read:

```text
content/COURSE_FORMAT.md
content/COURSE_TEMPLATE.json
```

A course file owns the syllabus and permanent lesson IDs.

## Lesson files

Read:

```text
content/LESSON_FORMAT.md
content/LESSON_TEMPLATE.md
```

A written lesson must use an ID that already exists in a course syllabus. Its `course`, `module` and `order` must match the course declaration.

## Validate everything

```bash
npm run validate
```

The validator checks:

- course JSON schemas
- course/module/planned lesson IDs
- course and lesson prerequisite references
- lesson Markdown/frontmatter
- structured practice blocks
- authored lesson alignment with the course catalog

## Adding future lesson content

1. Pick the permanent lesson ID from a course syllabus.
2. Create a matching `content/lessons/.../*.lesson.md` file.
3. Use the exact `course`, `module` and `order` declared by the course file.
4. Add theory, quiz, exercises, labs and tasks.
5. Run `npm run validate`.
6. Refresh AXIOM.

There is no import step.

## Demo material

Old micro-demo lessons are preserved under `content/examples/lesson-demos/` with an `.example` suffix. They are not loaded by AXIOM and are not part of Year 01.

## SQLite

SQLite stores only user state:

- `lesson_progress`
- `quiz_attempts`
- `task_state`
- `practice_state`
- `notes`
- `study_sessions`

Delete `data/learning.sqlite` if you want a completely fresh local profile.

## Design principle

**Courses define what exists. Lessons teach it. SQLite remembers what you did.**

The curriculum can therefore grow over several years without turning the application itself into the content database.
