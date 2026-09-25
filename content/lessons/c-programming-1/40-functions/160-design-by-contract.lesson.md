---
{
  "schemaVersion": 1,
  "id": "c1.design-by-contract",
  "title": "Preconditions, Postconditions and Defensive Interfaces",
  "subtitle": "Make valid inputs, guaranteed outputs and failure behavior explicit",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Functions and Modularity",
  "order": 160,
  "estimatedMinutes": 80,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.headers-translation-units"
  ],
  "tags": [
    "c",
    "systems-programming",
    "functions"
  ],
  "objectives": [
    "Write preconditions and postconditions for C functions",
    "Distinguish programmer-contract violations from expected runtime failures",
    "Use assertions appropriately during development",
    "Design interfaces that make invalid states harder to pass accidentally"
  ],
  "status": "published"
}
---
# Preconditions, Postconditions and Defensive Interfaces

C gives you enough freedom to write an interface whose valid inputs are obvious—or one whose caller must guess. Design by contract is a reasoning discipline: specify what the caller must establish, what the function guarantees in return, and which failures are part of normal operation rather than bugs.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Preconditions belong to the interface

If a function receives a pointer and count, state whether the pointer may be null when the count is zero, what range the count may occupy, whether memory regions may overlap, and whether the function mutates them. These are not implementation trivia; they determine whether a call is valid.

## Postconditions make composition possible

A caller can reason about a function only if it knows what becomes true after a successful call: perhaps an output value is initialized, an array is sorted, or a status code distinguishes failure classes. Strong postconditions reduce the amount of internal knowledge that leaks across functions.

## Assertions are for internal assumptions

`assert` is useful for conditions that represent programmer errors or internal invariants during development. It can be disabled in builds defining `NDEBUG`, so it must not be the only mechanism protecting against ordinary hostile/invalid external input. Expected failures need real control flow.

## Defensive does not mean silently accepting nonsense

A robust interface validates what can legitimately be wrong at runtime and documents what the caller must guarantee. Excessive “defensive” checks inside every private helper can obscure invariant violations; too few checks at trust boundaries allow bad data deep into the system. Place validation where ownership of the contract is clear.

## Worked example — A documented pointer/count contract

```c
#include <stdbool.h>
#include <stddef.h>

/* Pre: out != NULL; values may be NULL only when count == 0.
   Post on true: *out contains the maximum element.
   Returns false when count == 0. */
bool max_int(const int *values, size_t count, int *out);
```

The comment is useful because C types alone do not encode nullability or the relationship between pointer and count.

## Failure modes to recognize

- Using `assert` to validate user input
- Leaving pointer/count relationships undocumented
- Returning an ambiguous sentinel that could also be a valid result
- Adding checks without defining what the caller can rely on after failure

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-assert-input",
  "type": "single-choice",
  "prompt": "Why is `assert(user_value >= 0)` usually inappropriate as the only validation for external input?",
  "options": [
    {
      "id": "a",
      "label": "Assertions are slower than all branches"
    },
    {
      "id": "b",
      "label": "Assertions can be disabled and represent programmer invariants rather than ordinary input errors"
    },
    {
      "id": "c",
      "label": "C has no assert facility"
    },
    {
      "id": "d",
      "label": "Assertions cannot inspect integers"
    }
  ],
  "answer": "b",
  "explanation": "External invalid data is an expected runtime condition; handle it with normal error control flow."
}
```

```exercise
{
  "id": "ex-c1-api-contracts",
  "title": "Redesign ambiguous APIs",
  "difficulty": "Core",
  "brief": "Given several functions using sentinel returns and undocumented pointers, redesign their signatures/contracts so callers can distinguish valid results from failure.",
  "estimatedMinutes": 60,
  "deliverables": [
    "api.h",
    "rationale.md"
  ],
  "constraints": [
    "No global error flag",
    "Every failure mode must be distinguishable or deliberately coalesced and documented"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
