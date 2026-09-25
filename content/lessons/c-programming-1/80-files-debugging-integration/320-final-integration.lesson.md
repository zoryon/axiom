---
{
  "schemaVersion": 1,
  "id": "c1.final-integration",
  "title": "Integrated C Program: Design, Debug and Explain",
  "subtitle": "Integrate representation, interfaces, I/O, pointers, tests and debugging into one explainable program",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Files, Debugging and Integration",
  "order": 320,
  "estimatedMinutes": 150,
  "difficulty": "Core",
  "prerequisites": [
    "c1.testing-basics"
  ],
  "tags": [
    "c",
    "systems-programming",
    "files-debugging-integration"
  ],
  "objectives": [
    "Design a multi-file C program from a written specification",
    "Apply explicit contracts and bounds invariants throughout",
    "Use tests and GDB to diagnose defects",
    "Defend design decisions and identify limitations"
  ],
  "status": "published"
}
---
# Integrated C Program: Design, Debug and Explain

This is the capstone for C Programming I. The standard is not “it runs once.” You must be able to explain the representation, every pointer/count relationship, every file/I/O failure path, the purpose of each module, the tests chosen, and what the compiler is allowed to assume. The project stays within fixed-capacity storage so that dynamic allocation remains a deliberate topic for C Programming II.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Specification: fixed-capacity record analyzer

Build a command-line program that reads a text file containing records such as `name,score`. Store up to a documented maximum number of records in a fixed-capacity catalog. Reject malformed lines without corrupting existing state. Provide summary statistics and search by exact name.

You decide the exact line grammar, maximum name length and maximum record count, but those choices must be documented and enforced.

## Architecture expectations

Separate at least: domain record definitions, parsing/validation, catalog operations, statistics, and the CLI boundary. Public headers expose only necessary declarations. Avoid mutable globals. Use pointer/count contracts and `const` consistently.

## Reliability expectations

Compile with strong warnings. Test empty files, one record, maximum capacity, overlong names, malformed scores, duplicate names according to your chosen policy, missing input files and I/O errors you can reasonably simulate. Use a debugger for at least one injected bug and record the investigation.

## Explanation is part of engineering

Your README must explain the major invariants and known limitations. A reviewer should be able to understand why each array access is within bounds and when each string is guaranteed terminated. You should also identify which problems would motivate dynamic allocation or more advanced parsing in the next course.

## Worked example — Suggested module boundary

```text
include/record.h
include/catalog.h
include/parser.h
src/record.c
src/catalog.c
src/parser.c
src/main.c
tests/tests.c
README.md
```

The exact layout is not graded; separation of responsibilities and explicit interfaces are.

## Failure modes to recognize

- Cramming the whole program into main
- Silently truncating malformed input without a declared policy
- Using unsafe string assumptions
- Treating compiler warnings as acceptable “because tests pass”
- Submitting code you cannot explain line by line

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-capstone-invariant",
  "type": "free-response",
  "prompt": "Give three representation invariants a fixed-capacity record catalog should maintain.",
  "answer": "Examples: `length <= capacity`; every live record is stored in indices `[0,length)`; every stored name is null-terminated within its fixed array; no operation treats slots `[length,capacity)` as initialized records; any chosen uniqueness rule for names is preserved.",
  "explanation": "A representation invariant describes what must always be true of valid internal state."
}
```

```lab
{
  "id": "lab-c1-final-record-analyzer",
  "title": "C Programming I capstone — Record Analyzer",
  "brief": "Implement the complete multi-file fixed-capacity record analyzer described in this lesson, including parsing, catalog operations, statistics, search, tests, diagnostics and documentation.",
  "estimatedMinutes": 420,
  "deliverables": [
    "complete source tree",
    "test suite",
    "README.md",
    "debug-report.md",
    "design-notes.md"
  ],
  "rubric": [
    "Correctness and defined behavior",
    "Bounds/string discipline",
    "Module/interface quality",
    "Error handling",
    "Test depth",
    "Compiler cleanliness",
    "Ability to explain the design"
  ]
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.

## Closing perspective

Finishing this project should leave you with something more important than a working executable: a repeatable method for turning a specification into C code whose state, bounds, interfaces and failures you can reason about.
