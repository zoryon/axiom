---
{
  "schemaVersion": 1,
  "id": "c1.nested-data",
  "title": "Nested Structures, Arrays and Pointers",
  "subtitle": "Reason about aggregates that contain arrays, structures and pointers without losing ownership/bounds clarity",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Structured Data",
  "order": 280,
  "estimatedMinutes": 95,
  "difficulty": "Core",
  "prerequisites": [
    "c1.enums-unions"
  ],
  "tags": [
    "c",
    "systems-programming",
    "structured-data"
  ],
  "objectives": [
    "Navigate nested member/index expressions correctly",
    "Distinguish embedded storage from referenced storage",
    "Design structs whose invariants relate lengths, capacities and arrays/pointers",
    "Avoid shallow-copy surprises in pointer-containing aggregates"
  ],
  "status": "published"
}
---
# Nested Structures, Arrays and Pointers

Real data structures combine the concepts you have learned: a structure can contain an array, another structure, a pointer to external storage and counts describing valid ranges. Complexity rises quickly unless you state ownership and invariants explicitly.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Embedded versus referenced data

`struct A { int values[16]; };` embeds sixteen integers inside every `A` object. `struct B { int *values; };` stores only a pointer value inside `B`; the integers live somewhere else. Assignment of `A` copies its embedded array as part of the structure value, while assignment of `B` copies the pointer value and creates another alias.

## Length/capacity invariants belong with the representation

A record containing `T *data`, `size_t length`, and `size_t capacity` should satisfy relationships such as `length <= capacity`. If capacity is nonzero, the pointer must designate sufficient storage according to the representation contract. C Programming II will use this model for dynamic arrays.

## Nested indexing still needs local proofs

An expression like `matrix.rows[r].cells[c]` combines several accesses. Verify each layer: `r` is in range for rows, the chosen row is valid, and `c` is in range for that row’s cells. Read nested expressions from the inside out and identify the object at each step.

## Copy policy is part of API design

If a struct contains pointers, decide whether copying the struct is intended to share referenced data, forbidden by convention, or accompanied by an explicit deep-copy operation. C will happily perform a shallow structure assignment; ownership semantics are your responsibility.

## Worked example — Embedded storage versus pointer storage

```c
typedef struct {
    char name[32];      /* embedded bytes */
    const int *scores; /* referenced elsewhere */
    size_t score_count;
} StudentView;
```

Copying `StudentView` duplicates `name` bytes and the pointer/count values. Both copies then refer to the same score sequence.

## Failure modes to recognize

- Assuming a copied pointer-containing struct owns an independent deep copy
- Updating length without updating the corresponding storage invariant
- Checking only the outer bound in nested access
- Using pointers without documenting ownership/lifetime relationships

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-embedded-copy",
  "type": "single-choice",
  "prompt": "When a struct containing `char name[32]` is assigned to another struct of the same type, what happens to `name`?",
  "options": [
    {
      "id": "a",
      "label": "Only a pointer to name is copied"
    },
    {
      "id": "b",
      "label": "The embedded array member is copied as part of structure assignment"
    },
    {
      "id": "c",
      "label": "The assignment is illegal"
    },
    {
      "id": "d",
      "label": "The source name is freed"
    }
  ],
  "answer": "b",
  "explanation": "Embedded members are part of the structure value. Pointer members, by contrast, copy pointer values."
}
```

```lab
{
  "id": "lab-c1-nested-catalog",
  "title": "Fixed-capacity catalog",
  "brief": "Build a fixed-capacity catalog of records with embedded names and numeric fields. Support add/find/update/list without dynamic allocation. Write representation invariants and test boundary capacity cases.",
  "estimatedMinutes": 160,
  "deliverables": [
    "catalog.c",
    "catalog.h",
    "tests.c",
    "invariants.md"
  ],
  "rubric": [
    "Representation clarity",
    "Bounds discipline",
    "Separation of lookup/update logic",
    "Test quality",
    "Readable interfaces"
  ]
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
