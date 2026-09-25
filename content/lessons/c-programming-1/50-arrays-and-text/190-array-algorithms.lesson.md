---
{
  "schemaVersion": 1,
  "id": "c1.array-algorithms",
  "title": "Searching, Counting and Transforming Arrays",
  "subtitle": "Linear scans as the first bridge from representation to algorithmic reasoning",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Arrays, Strings and Contiguous Memory",
  "order": 190,
  "estimatedMinutes": 90,
  "difficulty": "Core",
  "prerequisites": [
    "c1.strings"
  ],
  "tags": [
    "c",
    "systems-programming",
    "arrays-and-text"
  ],
  "objectives": [
    "Implement search, count and transformation loops over arrays",
    "State time and extra-space costs informally",
    "Distinguish in-place mutation from producing a new result",
    "Use invariants to prove simple array algorithms"
  ],
  "status": "published"
}
---
# Searching, Counting and Transforming Arrays

Arrays give us enough structure to begin talking about algorithms rather than just syntax. A linear scan touches elements in a predictable order, maintains a small amount of state and has a straightforward invariant. You will later formalize complexity; for now, learn to connect the amount of work to the number of elements.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Linear search

To find a target in an unsorted array, inspect elements until a match occurs or the range is exhausted. The invariant is that no earlier inspected element equals the target. Early return is justified when a match is found; otherwise reaching `n` proves absence from the inspected array.

## Reduction

Sum, minimum, maximum and count-if reduce a sequence to a smaller result. The accumulator invariant should state exactly what prefix has been summarized. For min/max, empty input deserves an explicit contract because there is no element from which to initialize the result.

## Transformation

An in-place transformation overwrites elements while preserving array length. A filter conceptually changes the number of retained elements; in a fixed array you can compact matching elements toward the front and return the new logical length. Distinguish physical capacity from logical content.

## Cost follows touched elements

A full linear scan performs work proportional to `n`. An early exit may do less on a particular input, but the worst case still inspects all elements. Extra storage can remain constant if only indices/accumulators are used.

## Worked example — Stable in-place filtering

```c
#include <stddef.h>

size_t keep_nonnegative(int *a, size_t n) {
    size_t write = 0;
    for (size_t read = 0; read < n; ++read) {
        if (a[read] >= 0) {
            a[write++] = a[read];
        }
    }
    return write;
}
```

Invariant: elements in `[0, write)` are exactly the retained elements from the already-inspected prefix, in original order.

## Failure modes to recognize

- Returning a value that cannot distinguish “not found” from a valid index
- Reading uninitialized accumulator state for empty input
- Mutating input when callers expect a pure query
- Using nested loops without noticing the cost growth

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-linear-search",
  "type": "free-response",
  "prompt": "State a loop invariant for a linear search that scans indices from 0 upward.",
  "answer": "Before testing index i, no element in the already-inspected range [0, i) matches the target. If a[i] matches, returning i is correct; if i reaches n, the target is absent from the entire range.",
  "explanation": "The invariant expresses exactly what the processed prefix proves."
}
```

```exercise
{
  "id": "ex-c1-array-algorithms",
  "title": "Build an array-algorithm mini library",
  "difficulty": "Core",
  "brief": "Implement find-first, count-if for a fixed predicate, stable compaction, reverse, and prefix sums. State time and extra-space cost for each.",
  "estimatedMinutes": 100,
  "deliverables": [
    "array_algorithms.c",
    "array_algorithms.h",
    "tests.c",
    "complexity.md"
  ],
  "constraints": [
    "No dynamic allocation",
    "All loops require an invariant note",
    "Boundary cases must include n=0 and n=1"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
