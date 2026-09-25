---
{
  "schemaVersion": 1,
  "id": "c1.enums-unions",
  "title": "Enumerations, Unions and Tagged Representations",
  "subtitle": "Represent finite states and variant data without losing the active-type invariant",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Structured Data",
  "order": 270,
  "estimatedMinutes": 90,
  "difficulty": "Core",
  "prerequisites": [
    "c1.structs"
  ],
  "tags": [
    "c",
    "systems-programming",
    "structured-data"
  ],
  "objectives": [
    "Use enumerations to name finite categories",
    "Explain union storage sharing conceptually",
    "Build a tagged union whose tag records the active variant",
    "Identify the invariant required for safe union member access"
  ],
  "status": "published"
}
---
# Enumerations, Unions and Tagged Representations

Enums improve the vocabulary of finite states; unions let several member representations share storage. Combined carefully, they form a tagged union: a common C technique for representing “one of several variants.” The key is an invariant that the tag and active payload agree.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Enumerations name states

An enumeration defines named integer constants associated with an enumerated type. It can make APIs clearer than anonymous magic numbers. C enum typing and representational details have evolved, so avoid assumptions about exact underlying width unless an interface requires and guarantees it.

## A union overlays member storage

A union has enough storage/alignment for its members, but conceptually only the appropriate active member should be interpreted according to the rules relevant to how it was most recently stored. Using unions as a casual type-punning trick is subtle and not the purpose of this lesson.

## Tagged unions make the invariant explicit

Store an enum tag beside a union payload. If the tag says `VALUE_INT`, the integer member is active; if it says `VALUE_POINT`, the point member is active. Every constructor sets both together, and every consumer switches on the tag before selecting the payload.

## Exhaustive switches communicate intent

A `switch` over a finite tag can make variant handling obvious. Decide whether a `default` branch helps or hides missing cases. In codebases that rely on compiler diagnostics for unhandled enum values, omitting `default` can sometimes improve checking; policy depends on tooling and compatibility needs.

## Worked example — A tagged value

```c
typedef enum { VALUE_INT, VALUE_DOUBLE } ValueKind;

typedef struct {
    ValueKind kind;
    union {
        int as_int;
        double as_double;
    } data;
} Value;
```

Correct consumers maintain the invariant: `kind` determines which union member is interpreted.

## Failure modes to recognize

- Using raw integer magic values instead of named states
- Reading a union member inconsistent with the program’s active-variant rules
- Changing the tag without updating the payload
- Assuming enum storage width without a documented ABI requirement

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-tagged-union",
  "type": "single-choice",
  "prompt": "What makes a tagged union robust as a variant representation?",
  "options": [
    {
      "id": "a",
      "label": "Every union member is read simultaneously"
    },
    {
      "id": "b",
      "label": "A separate tag records which payload variant is currently valid"
    },
    {
      "id": "c",
      "label": "The union allocates every member separately"
    },
    {
      "id": "d",
      "label": "It requires no invariant"
    }
  ],
  "answer": "b",
  "explanation": "The tag/payload agreement is the central invariant."
}
```

```exercise
{
  "id": "ex-c1-tagged-value",
  "title": "Implement a tagged measurement value",
  "difficulty": "Core",
  "brief": "Create a tagged union representing integer counts, floating measurements and an invalid/error state. Implement constructors, formatting and equality according to the active tag.",
  "estimatedMinutes": 85,
  "deliverables": [
    "value.c",
    "value.h",
    "tests.c"
  ],
  "constraints": [
    "Never inspect a payload without checking its tag",
    "No magic numeric tags"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
