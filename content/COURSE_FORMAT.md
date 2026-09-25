# AXIOM Course File Format — schemaVersion 1

A course is one `*.course.json` file under `content/courses/`.

Course files define the **academic map**: course identity, track, term, workload, outcomes, modules, planned lesson IDs, lesson order and prerequisite graph. They do **not** contain the lesson prose or practice itself.

The actual lesson is later created as a `*.lesson.md` file under `content/lessons/` using the permanent lesson ID declared here.

## Why course files exist

This separates three layers:

1. `*.course.json` — what must be taught and in what order.
2. `*.lesson.md` — the actual theory, examples, quiz, exercises and labs.
3. `data/learning.sqlite` — the student's private state and progress.

That means AXIOM can show a complete syllabus before every lesson has been authored.

## Minimal shape

```json
{
  "schemaVersion": 1,
  "id": "c-programming-1",
  "code": "CS-101",
  "label": "C Programming I",
  "track": "Computer Science",
  "year": 1,
  "term": "1",
  "order": 10,
  "accent": "signal",
  "recommendedHours": 95,
  "description": "...",
  "prerequisites": [],
  "outcomes": [
    "Write and debug non-trivial C programs."
  ],
  "assessments": [
    {"id":"c1-final","title":"Final Exam","type":"exam","weight":40}
  ],
  "modules": [
    {
      "id": "machine-and-toolchain",
      "title": "The Program and the Machine",
      "description": "...",
      "order": 10,
      "plannedLessons": [
        {
          "id": "c1.what-a-program-is",
          "title": "What a Program Is — Source, Translation and Execution",
          "order": 10,
          "estimatedMinutes": 80,
          "prerequisites": []
        }
      ]
    }
  ]
}
```

## Stable IDs

Course IDs, module IDs and especially planned lesson IDs are part of the curriculum contract.

Once a lesson has been used, do not casually rename its ID. Progress in SQLite is keyed to the lesson ID.

When the full lesson is authored later, its frontmatter must use:

- the exact planned lesson `id`;
- the owning course `id` in `course`;
- the exact module title in `module`;
- the exact planned numeric `order`.

AXIOM validates these relationships.

## Terms

`term` can be:

- `"1"` — first term;
- `"2"` — second term;
- `"year"` — year-long course;
- `"self-paced"` — outside the normal term sequence.

## Prerequisites

There are two levels:

- course-level `prerequisites`, containing course IDs;
- lesson-level `prerequisites`, containing permanent planned lesson IDs.

Lesson prerequisites may point across courses. This is how, for example, Numerical Computing can require specific Calculus, Linear Algebra and C foundations rather than merely saying "take those courses first".

## Validation

Run:

```bash
npm run validate
```

The validator checks course schemas, duplicate course/module/lesson IDs, missing course prerequisites, missing planned lesson prerequisites and alignment of every authored `.lesson.md` file with the course catalog.
