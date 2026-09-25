---
{
  "schemaVersion": 1,
  "id": "c1.bounds",
  "title": "Bounds, Off-by-One Errors and Memory Discipline",
  "subtitle": "Treat every memory access as a claim about a valid object and valid subobject",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Arrays, Strings and Contiguous Memory",
  "order": 200,
  "estimatedMinutes": 85,
  "difficulty": "Core",
  "prerequisites": [
    "c1.array-algorithms"
  ],
  "tags": [
    "c",
    "systems-programming",
    "arrays-and-text"
  ],
  "objectives": [
    "Derive valid indices from array length",
    "Identify off-by-one patterns before execution",
    "Explain one-past pointer/index concepts at a high level",
    "Design loops and APIs that preserve bounds invariants"
  ],
  "status": "published"
}
---
# Bounds, Off-by-One Errors and Memory Discipline

Memory safety begins with bounds discipline. Every `a[i]` claims that an element `i` exists in the array object currently designated. C does not automatically check that claim. An incorrect index can corrupt unrelated state, disclose data or trigger undefined behavior.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## The last valid index is `n - 1`, not `n`

For length `n > 0`, valid integer indices are `[0, n)`. An index equal to `n` is one past the final element. The language gives limited meaning to one-past pointers for iteration/comparison, but dereferencing one past is not valid element access.

## Off-by-one bugs come from mismatched conventions

If one function interprets a pair as inclusive `[first,last]` while another interprets `[begin,end)`, adapters are necessary. Prefer one convention consistently. Half-open ranges compose: splitting `[0,n)` at `m` yields `[0,m)` and `[m,n)` without overlapping or dropping an element.

## Capacity, length and index are different

A buffer may have capacity 128 but contain 17 logical elements. An index can be less than capacity yet still be outside the current logical data. Correctness depends on which boundary the operation is supposed to respect.

## Bounds checks need overflow-safe arithmetic

A check such as `if (offset + length <= capacity)` can itself wrap for unsigned types. A safer shape is often `if (offset <= capacity && length <= capacity - offset)`. Later courses will develop secure arithmetic more deeply; learn now that the check expression is part of the attack surface.

## Worked example — Half-open slice validation

```c
#include <stdbool.h>
#include <stddef.h>

bool valid_slice(size_t capacity, size_t offset, size_t length) {
    return offset <= capacity && length <= capacity - offset;
}
```

The second subtraction is evaluated only after proving `offset <= capacity`, avoiding underflow in the expression `capacity - offset`.

## Failure modes to recognize

- Looping through `i <= n` for n-element arrays
- Confusing allocated capacity with initialized logical length
- Performing overflow-prone arithmetic inside a bounds check
- Treating one-past as a dereferenceable element

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-last-index",
  "type": "single-choice",
  "prompt": "For an array of length n where n > 0, what is the last valid index?",
  "options": [
    {
      "id": "a",
      "label": "n"
    },
    {
      "id": "b",
      "label": "n - 1"
    },
    {
      "id": "c",
      "label": "n + 1"
    },
    {
      "id": "d",
      "label": "Always 0"
    }
  ],
  "answer": "b",
  "explanation": "Valid indices are the half-open range [0,n)."
}
```

```lab
{
  "id": "lab-c1-bounds-audit",
  "title": "Bounds-safety audit",
  "brief": "Audit a deliberately buggy fixed-buffer program containing off-by-one, capacity/length confusion and overflow-prone checks. Produce a corrected version and a written invariant for every indexed loop.",
  "estimatedMinutes": 130,
  "deliverables": [
    "fixed.c",
    "audit.md",
    "tests.c"
  ],
  "rubric": [
    "Every memory access justified",
    "Boundary tests",
    "Overflow-aware checks",
    "Clear invariants",
    "No warning suppression"
  ]
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
