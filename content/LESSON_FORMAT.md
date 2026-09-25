# AXIOM Lesson File Format — schemaVersion 1

Every lesson is one file placed anywhere under `content/lessons/` and named `*.lesson.md`. Subfolders are supported, so the full curriculum can be organized by course and module.
The application scans this tree on every refresh. No import step is required.


## 0. Curriculum contract

Before a lesson file is written, its permanent ID is declared in one of the `content/courses/*.course.json` syllabus files. A written lesson must match that declaration: `id`, `course`, `module` and `order` are validated against the course catalog.

This lets AXIOM show the complete planned syllabus even while lesson content is still being authored.

## 1. JSON frontmatter

A lesson starts with a strict JSON object between `---` delimiters.

```md
---
{
  "schemaVersion": 1,
  "id": "c.memory.pointers",
  "title": "Memory & Pointers",
  "subtitle": "Addresses, indirection, lifetime and aliasing",
  "course": "c-programming",
  "track": "Computer Science",
  "module": "Memory Model",
  "order": 120,
  "estimatedMinutes": 75,
  "difficulty": "Foundational",
  "prerequisites": ["c.machine-model"],
  "tags": ["c", "memory", "pointers"],
  "objectives": [
    "Explain what a pointer value represents",
    "Trace pointer mutations by hand"
  ],
  "status": "published"
}
---
```

### Required fields

`schemaVersion`, `id`, `title`, `course`, `module`, `order`, `estimatedMinutes`, `objectives`.

`id` is permanent. Never change it after a lesson has been used, because SQLite progress is keyed to it.

## 2. Supported prose Markdown

- `#` to `####` headings
- paragraphs
- ordered and unordered lists
- blockquotes
- fenced code blocks such as ` ```c `
- simple Markdown tables
- inline `**bold**`, `*italic*`, `` `code` ``, and `[links](https://...)`
- horizontal rules with `---`

## 3. Structured interactive blocks

Interactive blocks use fenced JSON. The block `id` must be unique inside the lesson.

### Quiz

```quiz
{
  "id": "q-pointer-01",
  "type": "single-choice",
  "prompt": "What does p contain?",
  "options": [
    {"id":"a","label":"The integer itself"},
    {"id":"b","label":"An address identifying an object"}
  ],
  "answer": "b",
  "explanation": "A pointer value designates an object/function or is a special pointer value."
}
```

`type` can be `single-choice`, `multiple-choice`, or `free-response`.
For `free-response`, the learner writes first and the server reveals the model answer for self-assessment. For objective quiz types, grading happens locally on the Node server. The answer is never sent with the initial lesson payload.

### Task

```task
{
  "id": "task-trace-01",
  "title": "Trace the program without running it",
  "detail": "Write the final value of every object on paper."
}
```

Task completion is persisted in SQLite.

### Exercise

```exercise
{
  "id": "ex-vector-01",
  "title": "Implement a dynamic array",
  "difficulty": "Core",
  "brief": "Implement growth and ownership manually in C.",
  "estimatedMinutes": 60,
  "deliverables": ["vector.c", "vector.h", "tests.c"],
  "constraints": ["No third-party libraries", "No leaks under Valgrind"],
  "starterCode": "typedef struct { int *data; size_t len; size_t cap; } Vector;",
  "language": "c"
}
```

### Lab

```lab
{
  "id": "lab-parser-01",
  "title": "Production parser",
  "brief": "Build a robust parser under explicit engineering constraints.",
  "estimatedMinutes": 150,
  "deliverables": ["source", "tests", "README"],
  "rubric": ["Correctness", "Memory safety", "Error reporting", "Test quality"]
}
```

### Callout

```callout
{
  "tone": "important",
  "title": "Invariant",
  "body": "A valid pointer is not automatically safe to dereference."
}
```

### Math

```math
{
  "label": "Definition",
  "tex": "T(n) = 2T(n/2) + n",
  "caption": "A recurrence used in divide-and-conquer analysis."
}
```

### Memory visual

```memory
{
  "title": "A possible object layout",
  "rows": [
    {"address":"0x1000","bytes":"2A 00 00 00","label":"x = 42"},
    {"address":"0x1008","bytes":"00 10 00 00 ...","label":"p = &x"}
  ]
}
```

## 4. Validation

Run:

```bash
npm run validate
```

The validator rejects malformed metadata, invalid structured blocks, duplicate IDs and missing prerequisites.

## 5. Content policy for the future curriculum

Lessons should be self-contained enough to study without an external course, while still linking to primary references when useful. A strong lesson normally moves through:

**intuition → formal model → worked examples → edge cases → implementation → machine-level consequences → practice → engineering transfer**.


## 6. Automatic indexing

AXIOM automatically scans structured blocks inside every lesson. You do not manually register work elsewhere.

- `quiz` blocks appear in **Practice → Quizzes** and failed attempts become review items.
- `task` blocks appear in **Practice → Tasks** and have persistent completion state.
- `exercise` blocks appear in **Practice → Exercises** and have persistent completion state.
- `lab` blocks appear in **Practice → Labs** and have persistent completion state.
- available work may be selected automatically by **Today**.

`estimatedMinutes` is optional on `quiz`, `task`, `exercise` and `lab` blocks. When omitted, AXIOM uses a sensible default for scheduling.

The stable block `id` is important: changing prose or requirements later will not lose the student's saved completion state as long as the ID remains unchanged.
