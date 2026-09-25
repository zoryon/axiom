---
{
  "schemaVersion": 1,
  "id": "c1.pointer-arithmetic",
  "title": "Pointer Arithmetic and Array Relationships",
  "subtitle": "Pointer arithmetic moves within array objects in element-sized steps",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Pointers and Indirection",
  "order": 230,
  "estimatedMinutes": 105,
  "difficulty": "Core",
  "prerequisites": [
    "c1.pointer-basics"
  ],
  "tags": [
    "c",
    "systems-programming",
    "pointers"
  ],
  "objectives": [
    "Explain the relationship between `a[i]` and pointer arithmetic",
    "Perform valid pointer addition/subtraction within one array object",
    "Use one-past pointers for iteration without dereferencing them",
    "Recognize out-of-bounds pointer formation/use hazards"
  ],
  "status": "published"
}
---
# Pointer Arithmetic and Array Relationships

Pointer arithmetic is not general arithmetic on machine addresses. Its defined meaning is tied to array objects. Adding one to an `int *` advances to the next `int` element *within the same array object*; the implementation scales by the element size. This domain restriction is more important than the numeric address you may see in a debugger.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Arrays create the arithmetic domain

For pointer `p` designating element `a[i]`, `p + k` can validly designate another element of the same array or the special one-past position when the resulting index stays in the permitted range. Forming pointers beyond that domain can itself be undefined, even if you never dereference them.

## Subscript notation is pointer-based

At the language level, `a[i]` is defined in terms of pointer addition and indirection, effectively `*(a + i)` after relevant conversions. This explains why pointer and array syntax interact so closely while still not making the types identical.

## One-past is a boundary sentinel

A pointer one past the final array element may be formed and used for comparison/subtraction in appropriate cases, but it does not designate an element and must not be dereferenced. Iteration patterns such as `for (p = a; p != a + n; ++p)` use it as an endpoint.

## Pointer difference counts elements

Subtracting two pointers into the same array (subject to the standard’s requirements) yields a `ptrdiff_t` element distance, not a byte count. Pointers into unrelated objects cannot be portably subtracted or relationally ordered as though all memory were one flat array.

## Worked example — Pointer iteration

```c
#include <stddef.h>

long sum(const int *a, size_t n) {
    const int *end = a + n;
    long total = 0;
    for (const int *p = a; p != end; ++p) {
        total += *p;
    }
    return total;
}
```

For a valid non-null pointer/count contract, `end` is one past the array. It is compared but never dereferenced.

## Failure modes to recognize

- Treating pointer addition as raw byte addition
- Forming arbitrary pointers outside an array and hoping not to dereference them
- Dereferencing the one-past endpoint
- Subtracting pointers into unrelated objects

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-pointer-step",
  "type": "single-choice",
  "prompt": "If p is an `int *` designating an array element, what does `p + 1` conceptually designate when valid?",
  "options": [
    {
      "id": "a",
      "label": "The next byte"
    },
    {
      "id": "b",
      "label": "The next int element"
    },
    {
      "id": "c",
      "label": "An integer one larger than *p"
    },
    {
      "id": "d",
      "label": "Always address 1"
    }
  ],
  "answer": "b",
  "explanation": "Pointer arithmetic is scaled by the pointed-to type and is defined relative to an array object."
}
```

```exercise
{
  "id": "ex-c1-pointer-array-equivalence",
  "title": "Rewrite array algorithms with pointer ranges",
  "difficulty": "Core",
  "brief": "Rewrite three prior array algorithms using `[begin,end)` pointer ranges rather than indices. Explain which version you find easier to prove and why.",
  "estimatedMinutes": 80,
  "deliverables": [
    "pointer_ranges.c",
    "comparison.md"
  ],
  "constraints": [
    "No pointer may move outside its array-or-one-past domain",
    "Never dereference end"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
