---
{
  "schemaVersion": 1,
  "id": "c1.first-programs",
  "title": "Building and Running Small C Programs",
  "subtitle": "From declarations and statements to small programs you can compile, run and explain",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "The Program and the Machine",
  "order": 30,
  "estimatedMinutes": 75,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.toolchain"
  ],
  "tags": [
    "c",
    "systems-programming",
    "machine-and-toolchain"
  ],
  "objectives": [
    "Write a strictly structured small C program using functions and standard I/O",
    "Explain the role and return value of main",
    "Differentiate declarations, expressions and statements",
    "Compile with useful warning flags and run from a terminal"
  ],
  "status": "published"
}
---
# Building and Running Small C Programs

Your first programs should be small enough that every line is explainable. The goal is not to race toward features; it is to establish precise habits: explicit function signatures, predictable control flow, warnings enabled, checked input assumptions and a clean distinction between data, computation and presentation.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Program structure and `main`

A hosted C implementation starts your application through an environment-specific path and ultimately calls a permitted form of `main`. For this course we will normally use `int main(void)` when no command-line arguments are needed and `int main(int argc, char **argv)` later when they are.

Returning zero conventionally reports successful termination to the host environment. Nonzero values can indicate failure; `EXIT_SUCCESS` and `EXIT_FAILURE` from `<stdlib.h>` make that intent explicit.

## Declarations create vocabulary

A declaration tells the translator about an identifier and its type. A definition additionally provides the entity in cases where that distinction applies. Local object definitions such as `int count = 0;` establish typed state; function declarations establish callable interfaces.

C is statically typed, but implicit conversions are frequent. “It compiled” does not mean “the types expressed my intention.” Warning flags help surface suspicious conversions and missing declarations.

## Expressions compute; statements control

Expressions produce values and can have side effects. Statements govern execution: expression statements, compound blocks, selection and iteration. Learn to read a block as a sequence of state transitions. When a beginner loses track of a program, the usual problem is not syntax; it is an untracked change in state.

## Input is a boundary, not a convenience

Standard I/O functions are part of the library, not syntax built into C. Functions such as `puts`, `printf`, `fgets` and conversion routines have contracts. Later we will treat input as untrusted text that must be validated. For now, prefer examples whose inputs are explicit so the computation itself remains easy to reason about.

## Worked example — A small, explainable program

```c
#include <stdio.h>

static int square(int x) {
    return x * x;
}

int main(void) {
    int value = 7;
    int result = square(value);
    printf("%d squared is %d\n", value, result);
    return 0;
}
```

You should be able to point to every object, every function call and every state transition.

## Failure modes to recognize

- Writing code before deciding what each variable represents
- Using `void main()` in ordinary hosted examples
- Suppressing warnings instead of understanding them
- Mixing input parsing, business logic and output in one large function

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-main-return",
  "type": "single-choice",
  "prompt": "Why does this course prefer `int main(void)` for a no-argument hosted program?",
  "options": [
    {
      "id": "a",
      "label": "Because C requires every function to be named main"
    },
    {
      "id": "b",
      "label": "Because it gives an explicit no-parameter function type and returns status to the host"
    },
    {
      "id": "c",
      "label": "Because `void main()` allocates too much memory"
    },
    {
      "id": "d",
      "label": "Because it enables macros"
    }
  ],
  "answer": "b",
  "explanation": "`int main(void)` clearly states that no arguments are accepted and that an integer termination status is returned."
}
```

```exercise
{
  "id": "ex-c1-small-program",
  "title": "Build a unit-conversion CLI core",
  "difficulty": "Foundational",
  "brief": "Write a program with separate functions for Celsius/Fahrenheit conversion. Use fixed test inputs first and print clearly labeled results.",
  "estimatedMinutes": 45,
  "deliverables": [
    "convert.c",
    "README.md"
  ],
  "constraints": [
    "Compile with warnings enabled",
    "No global mutable state",
    "Each conversion must be a separate function"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
