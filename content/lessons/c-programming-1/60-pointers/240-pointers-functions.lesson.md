---
{
  "schemaVersion": 1,
  "id": "c1.pointers-functions",
  "title": "Pointers as Function Parameters",
  "subtitle": "Use pointers to share object identity across function boundaries without losing contract clarity",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Pointers and Indirection",
  "order": 240,
  "estimatedMinutes": 90,
  "difficulty": "Core",
  "prerequisites": [
    "c1.pointer-arithmetic"
  ],
  "tags": [
    "c",
    "systems-programming",
    "pointers"
  ],
  "objectives": [
    "Pass pointers to allow functions to inspect or modify caller-owned objects",
    "Design pointer/count and input/output parameter contracts",
    "Use `const` to express read-only access",
    "Explain that pointer arguments are still passed by value"
  ],
  "status": "published"
}
---
# Pointers as Function Parameters

Pointers make it possible for a function to work with objects owned by its caller. This is where C APIs become powerful—and where vague contracts become dangerous. Every pointer parameter should make you ask: may it be null, what object/range may it designate, may the function write, and for how long is the designation valid?

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Mutation through a pointer

A swap function receives two pointer values. The parameter objects themselves are local copies, but they designate caller-owned integers, so assigning through `*a` and `*b` changes those external objects. This is not pass-by-reference syntax; it is pass-by-value of pointer values.

## Read-only ranges

An API that only reads an array should normally accept `const T *` so callers and reviewers can see that mutation through that access path is not intended. This also allows calls with genuinely const data. Qualification is part of interface design, not just a compiler hurdle.

## Output parameters

A function can use an output pointer to return an additional value while reserving the ordinary return value for status. The contract must guarantee when the output is written. On failure, either leave it unchanged or set it to a documented state—do not make callers guess.

## Aliasing can constrain an implementation

If two pointer parameters may designate overlapping objects, operations can interact. If overlap is forbidden, document it. Advanced C provides `restrict` for certain non-aliasing promises, but misusing it can introduce undefined behavior; we will not rely on it in this introductory course.

## Worked example — Swap caller-owned integers

```c
void swap_int(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}
```

Precondition: both pointers validly designate writable `int` objects. Aliasing (`a == b`) is harmless for this implementation, though every API should decide such cases explicitly.

## Failure modes to recognize

- Passing null to a function that unconditionally dereferences
- Forgetting `const` on read-only data
- Assuming pointer parameter reassignment changes the caller’s pointer variable
- Leaving output parameters uninitialized on documented success paths

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-pointer-pass",
  "type": "single-choice",
  "prompt": "Inside `void f(int *p)`, executing `p = NULL;` does what to the caller’s pointer variable itself?",
  "options": [
    {
      "id": "a",
      "label": "Always sets the caller variable to null"
    },
    {
      "id": "b",
      "label": "Changes only the local pointer parameter; the caller pointer object is separate"
    },
    {
      "id": "c",
      "label": "Frees the pointed object"
    },
    {
      "id": "d",
      "label": "Is invalid C"
    }
  ],
  "answer": "b",
  "explanation": "The pointer value was passed by value. To modify a caller pointer object, a function would need a pointer to that pointer object."
}
```

```exercise
{
  "id": "ex-c1-pointer-apis",
  "title": "Design pointer-based APIs",
  "difficulty": "Core",
  "brief": "Implement swap, min/max output, array normalization query, and safe lookup functions using pointer parameters. Document nullability, aliasing and mutation for every parameter.",
  "estimatedMinutes": 90,
  "deliverables": [
    "pointer_api.c",
    "pointer_api.h",
    "tests.c"
  ],
  "constraints": [
    "Use const wherever mutation is not needed",
    "No undocumented null behavior"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
