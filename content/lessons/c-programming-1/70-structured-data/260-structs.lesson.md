---
{
  "schemaVersion": 1,
  "id": "c1.structs",
  "title": "Structures and Aggregate Data",
  "subtitle": "Aggregate related fields into typed records while respecting layout and value semantics",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Structured Data",
  "order": 260,
  "estimatedMinutes": 90,
  "difficulty": "Core",
  "prerequisites": [
    "c1.pointer-safety"
  ],
  "tags": [
    "c",
    "systems-programming",
    "structured-data"
  ],
  "objectives": [
    "Define and initialize structure types",
    "Access members directly and through pointers",
    "Explain structure assignment at a high level",
    "Recognize padding/layout as implementation concerns"
  ],
  "status": "published"
}
---
# Structures and Aggregate Data

A structure groups named members into one aggregate object. That lets your program represent domain concepts—points, records, parser results—without parallel arrays or loosely related variables. Structures are also where layout, padding and API design begin to meet.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Structure types model records

A `struct` defines a sequence of named members. Different members can have different types, and each structure object contains its own member subobjects. This is a stronger representation than keeping `name`, `age` and `score` in unrelated variables because functions can accept or return the record as one conceptual value.

## Member access follows object versus pointer

Use `.` when you have a structure object and `->` when you have a pointer to a structure. `p->x` is equivalent to `(*p).x` with appropriate grouping. The distinction reinforces the same pointer/object model you already learned.

## Assignment copies structure values

For compatible structure types, assignment copies the members as specified by the language semantics. If a member is itself a pointer, the pointer value is copied—not the dynamically owned data it may designate. This distinction becomes crucial in ownership-heavy C code later.

## Padding is not payload

Implementations may insert unnamed padding between members or at the end to satisfy alignment. Therefore raw byte equality using `memcmp` is not automatically equivalent to semantic structure equality, and raw structure dumps are poor portable serialization formats.

## Worked example — A record with explicit operations

```c
typedef struct {
    double x;
    double y;
} Point;

Point point_add(Point a, Point b) {
    Point result = { a.x + b.x, a.y + b.y };
    return result;
}
```

Passing and returning small structs by value can be clear and idiomatic. Measure performance rather than assuming every aggregate must be passed by pointer.

## Failure modes to recognize

- Using parallel arrays/variables when one record type would preserve invariants better
- Assuming no padding exists
- Using raw `memcmp` as universal semantic equality
- Forgetting that copying a pointer member does not clone the pointed-to object

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-struct-pointer-member",
  "type": "single-choice",
  "prompt": "If a struct containing an `int *p` member is assigned to another struct of the same type, what happens to the pointed-to integer?",
  "options": [
    {
      "id": "a",
      "label": "It is automatically deep-copied"
    },
    {
      "id": "b",
      "label": "Only the pointer value is copied as part of member-wise value copying"
    },
    {
      "id": "c",
      "label": "It is automatically freed"
    },
    {
      "id": "d",
      "label": "Structure assignment is illegal"
    }
  ],
  "answer": "b",
  "explanation": "C structure assignment copies member values. Pointer members still designate the same underlying object unless you explicitly clone data."
}
```

```exercise
{
  "id": "ex-c1-struct-records",
  "title": "Model domain records with structs",
  "difficulty": "Core",
  "brief": "Represent 2D points and student grade summaries as structures. Implement construction/validation/query functions and semantic equality functions.",
  "estimatedMinutes": 80,
  "deliverables": [
    "records.c",
    "records.h",
    "tests.c"
  ],
  "constraints": [
    "No raw memcmp for semantic equality",
    "Document invariants for each struct type"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
