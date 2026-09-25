---
{
  "schemaVersion": 1,
  "id": "c1.loops",
  "title": "Loops, Iteration and Loop Invariants",
  "subtitle": "Iteration, progress measures and invariants that make loops provable",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Control Flow and Program Reasoning",
  "order": 100,
  "estimatedMinutes": 85,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.conditionals"
  ],
  "tags": [
    "c",
    "systems-programming",
    "control-flow"
  ],
  "objectives": [
    "Choose between `for`, `while` and `do` based on control structure",
    "State a loop invariant for simple iterations",
    "Identify initialization, progress and termination obligations",
    "Prevent nontermination and off-by-one defects"
  ],
  "status": "published"
}
---
# Loops, Iteration and Loop Invariants

A loop is a compact proof obligation. You need a valid state before the first iteration, a body that preserves the invariant, a progress measure that moves toward termination, and a condition that ends at exactly the right boundary. Thinking this way makes loops far less error-prone than “keep changing things until the condition becomes false.”

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## The invariant is what remains true

For a loop summing the first `i` elements, an invariant might be: before each test, `sum` equals the sum of elements with indices strictly less than `i`, and `0 <= i <= n`. The body processes element `i`, increments `i`, and re-establishes the same statement for the next iteration.

You do not need formal proof notation every time, but you should be able to state the invariant in plain language.

## Progress and variants

A loop can preserve an invariant forever and still be wrong if it does not make progress. A variant is a quantity that moves toward a bound, such as `n - i` decreasing each iteration. Infinite loops are sometimes intentional, but accidental nontermination usually means the progress argument was absent.

## Half-open ranges simplify reasoning

C array loops commonly use `for (size_t i = 0; i < n; ++i)`. The valid index set is the half-open interval `[0, n)`: it contains exactly `n` integers, composes naturally, and avoids a special last-element count. This convention appears throughout systems APIs for good reason.

## `break` and `continue` change the proof

Early exits can make code clearer, especially for search, but they add control-flow edges. A `break` should correspond to a clear success/failure condition; a `continue` should not accidentally skip required progress. Whenever you add one, restate the invariant and termination argument.

## Worked example — Invariant-driven sum

```c
#include <stddef.h>

long sum_ints(const int *a, size_t n) {
    long sum = 0;
    for (size_t i = 0; i < n; ++i) {
        sum += a[i];
    }
    return sum;
}
```

Conceptually, before each condition check, `sum` represents exactly the prefix `[0, i)` already processed.

## Failure modes to recognize

- Using `<= n` for an array of length n
- Updating the loop variable in several unrelated places
- Adding `break` without defining what fact makes the early exit valid
- Choosing unsigned countdown loops without considering wraparound

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-loop-range",
  "type": "single-choice",
  "prompt": "For an array with n elements indexed from 0, which loop condition directly represents the valid half-open index range?",
  "options": [
    {
      "id": "a",
      "label": "i <= n"
    },
    {
      "id": "b",
      "label": "i < n"
    },
    {
      "id": "c",
      "label": "i != n + 1"
    },
    {
      "id": "d",
      "label": "i > n"
    }
  ],
  "answer": "b",
  "explanation": "Indices in `[0,n)` are exactly 0 through n-1."
}
```

```exercise
{
  "id": "ex-c1-loop-invariants",
  "title": "Write invariants for three loops",
  "difficulty": "Core",
  "brief": "Implement prefix sum, linear search, and count-if loops. For each, write the invariant, progress measure, and postcondition before the code.",
  "estimatedMinutes": 75,
  "deliverables": [
    "loops.c",
    "reasoning.md"
  ],
  "constraints": [
    "Use half-open ranges",
    "No goto",
    "Explain any early exit"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
