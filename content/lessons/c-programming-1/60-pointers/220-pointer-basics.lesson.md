---
{
  "schemaVersion": 1,
  "id": "c1.pointer-basics",
  "title": "Pointer Types, Address-Of and Dereferencing",
  "subtitle": "Pointer values designate objects; dereferencing asserts that the designation is valid for access",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Pointers and Indirection",
  "order": 220,
  "estimatedMinutes": 100,
  "difficulty": "Core",
  "prerequisites": [
    "c1.memory-model-intro"
  ],
  "tags": [
    "c",
    "systems-programming",
    "pointers"
  ],
  "objectives": [
    "Declare pointer types and take object addresses with `&`",
    "Dereference valid pointers with `*`",
    "Distinguish pointer objects from pointed-to objects",
    "Trace aliasing when two pointers designate the same object"
  ],
  "status": "published"
}
---
# Pointer Types, Address-Of and Dereferencing

A pointer object stores a pointer value. That pointer value can designate another object, designate one past an array in restricted contexts, be null, or occupy other implementation/language-specific states. Dereferencing is not “look up the number at an address”; it is a semantic operation that requires the pointer to validly designate an appropriate live object.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Pointer type communicates the designated object type

If `int *p` designates an `int`, `*p` is an lvalue expression for that designated `int`. Assigning through `*p` modifies the pointed-to object. The pointer object `p` and the integer object are separate objects with different types and often different sizes.

## Address-of creates a designation

Unary `&` applied to an appropriate object lvalue produces a pointer to that object. `int *p = &x;` initializes `p` so that it designates `x`. Later assigning `p = &y;` changes what `p` designates; it does not move or rename `x`.

## Aliasing means multiple access paths

Two pointers can designate the same object. If `p` and `q` both designate `x`, writing through `*q` changes what is observed later through `*p` because the underlying object is shared. Aliasing is central to optimization and API design; for now, learn to trace object identity, not just variable names.

## Const qualification describes allowed access through an expression

`const int *p` means the pointed-to `int` cannot be modified *through `p`*. It does not necessarily mean the underlying object can never change through any alias. `int *const p` instead makes the pointer object itself non-assignable after initialization. Read declarations inside-out and practice both forms.

## Worked example — Two pointers, one object

```c
int x = 10;
int *p = &x;
int *q = p;

*q += 5;
/* x == 15 and *p == 15 */
```

Trace the identity: `p` and `q` hold pointer values that designate the same `x` object.

## Failure modes to recognize

- Confusing the pointer object with the pointed-to object
- Dereferencing before establishing that a pointer is valid
- Assuming `const int *` makes the underlying object globally immutable
- Using uninitialized pointer values

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-pointer-object",
  "type": "single-choice",
  "prompt": "After `int x=4; int *p=&x;`, what does `p` conceptually contain?",
  "options": [
    {
      "id": "a",
      "label": "A copy of integer 4"
    },
    {
      "id": "b",
      "label": "A pointer value designating x"
    },
    {
      "id": "c",
      "label": "The source-code name x"
    },
    {
      "id": "d",
      "label": "The size of x"
    }
  ],
  "answer": "b",
  "explanation": "The pointer object stores a pointer value that designates the integer object."
}
```

```quiz
{
  "id": "q-c1-aliasing",
  "type": "free-response",
  "prompt": "If p and q both designate x and the program executes `*q = 9`, what should a later valid read of `*p` observe, and why?",
  "answer": "It observes 9 because both access paths designate the same underlying object x; the write changed x, not merely q.",
  "explanation": "Aliasing is about multiple designations of the same storage."
}
```

```exercise
{
  "id": "ex-c1-pointer-traces",
  "title": "Trace pointer identity and mutation",
  "difficulty": "Core",
  "brief": "Solve ten pointer-state traces without running them, then verify under a debugger. Track pointer objects and pointed-to objects in separate columns.",
  "estimatedMinutes": 75,
  "deliverables": [
    "traces.md",
    "verify.c"
  ],
  "constraints": [
    "No pointer arithmetic yet",
    "Every dereference must identify the exact designated object"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
