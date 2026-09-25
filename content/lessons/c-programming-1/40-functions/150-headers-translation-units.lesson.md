---
{
  "schemaVersion": 1,
  "id": "c1.headers-translation-units",
  "title": "Headers, Translation Units and Interfaces",
  "subtitle": "Build multi-file C programs around declarations, definitions and explicit interfaces",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Functions and Modularity",
  "order": 150,
  "estimatedMinutes": 90,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.scope-storage-duration"
  ],
  "tags": [
    "c",
    "systems-programming",
    "functions"
  ],
  "objectives": [
    "Explain what a translation unit is",
    "Design a header that exposes declarations without duplicating definitions",
    "Use include guards or equivalent protection",
    "Compile and link multiple C source files separately"
  ],
  "status": "published"
}
---
# Headers, Translation Units and Interfaces

Large C programs are collections of translation units, not one giant source file. A header is primarily an interface artifact: it shares declarations and types needed by multiple translation units. Understanding this model is the foundation for libraries, separate compilation and sane build systems.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Translation units

After preprocessing, each source file is compiled as a translation unit. The compiler generally does not parse all `.c` files at once. This is why declarations must communicate the types of functions and objects defined elsewhere, and why a change in one header can force many translation units to rebuild.

## Headers declare interfaces

A header commonly contains function declarations, type definitions, constants/macros and carefully chosen inline definitions. Ordinary non-inline function definitions generally belong in a `.c` file so that exactly one external definition is linked.

Headers should be self-contained: including a public header in an otherwise empty translation unit should provide the declarations it needs rather than depending on mysterious include order.

## Include guards and repeated inclusion

Because `#include` is preprocessing-level inclusion, the same header may be encountered through several paths. Traditional include guards prevent duplicate declarations/definitions that are not safely repeatable. Many compilers support `#pragma once`, but standard include guards remain maximally portable.

## Interface stability and information hiding

A useful header exposes what callers need and hides implementation details. Even in C, reducing shared knowledge matters. If every file can mutate every global and depends on private structure fields, separate compilation gives little architectural benefit.

## Worked example — A small module interface

```c
/* counter.h */
#ifndef COUNTER_H
#define COUNTER_H

int counter_next(void);
void counter_reset(void);

#endif

/* counter.c */
#include "counter.h"
static int value = 0;
int counter_next(void) { return ++value; }
void counter_reset(void) { value = 0; }
```

The `static` file-scope object has internal linkage, so callers interact through the declared interface rather than naming the state directly.

## Failure modes to recognize

- Putting non-inline external function definitions in a header included by several .c files
- Relying on include order for a header to compile
- Exposing private mutable globals in headers
- Compiling multiple files but forgetting to link all required object files

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-translation-unit",
  "type": "single-choice",
  "prompt": "Conceptually, what source does the compiler see for one `.c` file after preprocessing?",
  "options": [
    {
      "id": "a",
      "label": "Only the characters typed in that .c file, never headers"
    },
    {
      "id": "b",
      "label": "A translation unit containing the preprocessed result including included header content"
    },
    {
      "id": "c",
      "label": "Every .c file in the project merged by the OS"
    },
    {
      "id": "d",
      "label": "Only machine instructions"
    }
  ],
  "answer": "b",
  "explanation": "Preprocessing forms the translation unit that is then compiled."
}
```

```exercise
{
  "id": "ex-c1-multifile-module",
  "title": "Create a three-file module",
  "difficulty": "Core",
  "brief": "Build an executable from main.c plus a reusable numeric module with one public header and one implementation file. Compile each source to an object file, then link them.",
  "estimatedMinutes": 70,
  "deliverables": [
    "main.c",
    "stats.c",
    "stats.h",
    "build-commands.md"
  ],
  "constraints": [
    "Header must be self-contained",
    "No mutable global state exposed publicly",
    "Use include guards"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
