---
{
  "schemaVersion": 1,
  "id": "c1.arrays",
  "title": "Arrays and Contiguous Storage",
  "subtitle": "Fixed-size sequences, object layout and the boundary between arrays and pointers",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Arrays, Strings and Contiguous Memory",
  "order": 170,
  "estimatedMinutes": 90,
  "difficulty": "Core",
  "prerequisites": [
    "c1.design-by-contract"
  ],
  "tags": [
    "c",
    "systems-programming",
    "arrays-and-text"
  ],
  "objectives": [
    "Declare and initialize arrays",
    "Explain contiguous element storage and valid index ranges",
    "Distinguish an array object from a pointer value",
    "Explain why array parameters require an accompanying length convention"
  ],
  "status": "published"
}
---
# Arrays and Contiguous Storage

Arrays are one of the places where C’s surface syntax encourages a dangerous shortcut: “arrays are pointers.” They are not. An array is an object consisting of contiguously stored elements. In many expressions an array expression is converted to a pointer to its first element, which explains much of the similar syntax without erasing the distinction.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Array objects have a fixed number of elements

`int a[4];` defines an array object containing four `int` subobjects. Valid indices are 0 through 3. `sizeof a` in the declaring scope yields the size of the whole array, not the size of a pointer—unless the expression has already undergone array-to-pointer conversion in another context.

## Contiguity creates predictable address relationships

Adjacent array elements are stored contiguously in increasing subscript order. This lets pointer arithmetic later move by element units. It also explains locality advantages when iterating linearly through memory.

## Array-to-pointer conversion is contextual

In most expressions, an array expression converts to a pointer to its first element. Important exceptions include operands of `sizeof`, unary `&`, and some language-version-specific contexts. A function parameter written `int a[]` is adjusted to a pointer parameter; the callee does not receive the full array object by value.

## Length is not carried by an ordinary pointer

Once a function has only `int *p`, the pointer value does not intrinsically tell it how many array elements are valid. APIs therefore carry a count, use a sentinel convention, or encode bounds through another structure. In this course, pointer/count pairs will be explicit.

## Worked example — Array size versus parameter adjustment

```c
#include <stddef.h>

size_t local_count(void) {
    int a[10];
    return sizeof a / sizeof a[0];
}

/* Here `a` is adjusted to `int *a`; sizeof a is pointer size. */
size_t wrong_count(int a[10]) {
    return sizeof a / sizeof a[0];
}
```

Compilers often warn about the second pattern. The written `[10]` in this parameter does not make the function receive an array object by value.

## Failure modes to recognize

- Saying “array equals pointer”
- Using `sizeof` on an array parameter to infer element count
- Indexing one-past the last element
- Passing an array without documenting how length is communicated

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-array-pointer",
  "type": "single-choice",
  "prompt": "Which statement is most accurate?",
  "options": [
    {
      "id": "a",
      "label": "An array object and a pointer object are identical types"
    },
    {
      "id": "b",
      "label": "Arrays are never convertible to pointers"
    },
    {
      "id": "c",
      "label": "An array is a distinct object type that often converts to a pointer to its first element in expressions"
    },
    {
      "id": "d",
      "label": "Pointers always know the length of an array"
    }
  ],
  "answer": "c",
  "explanation": "This distinction explains both the convenient syntax and many common bugs."
}
```

```exercise
{
  "id": "ex-c1-array-toolkit",
  "title": "Implement fixed-array utilities",
  "difficulty": "Core",
  "brief": "Implement sum, min/max, reverse and equality functions for integer arrays using explicit pointer/count contracts.",
  "estimatedMinutes": 75,
  "deliverables": [
    "arrays.c",
    "arrays.h",
    "tests.c"
  ],
  "constraints": [
    "No out-of-bounds accesses",
    "Length must be explicit at API boundaries",
    "Include empty-array behavior in contracts"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
