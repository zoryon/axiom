---
{
  "schemaVersion": 1,
  "id": "c1.conditionals",
  "title": "Conditionals and Boolean Reasoning",
  "subtitle": "Branching as logical partitioning of program states",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Control Flow and Program Reasoning",
  "order": 90,
  "estimatedMinutes": 70,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.undefined-behavior-intro"
  ],
  "tags": [
    "c",
    "systems-programming",
    "control-flow"
  ],
  "objectives": [
    "Model `if`/`else` conditions as predicates over state",
    "Use comparison and logical operators without accidental truthiness bugs",
    "Design mutually exclusive branches from explicit invariants",
    "Refactor complex conditions into named concepts"
  ],
  "status": "published"
}
---
# Conditionals and Boolean Reasoning

Conditionals are not merely syntax for “do this or that.” A branch partitions the possible program states according to a predicate. Strong programmers make those predicates explicit, test boundary cases, and ensure that each branch preserves the invariants required by later code.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Truth in C

A scalar expression used as a condition is false when it compares equal to zero and true otherwise. Comparison and logical operators yield integer truth values. This is convenient, but convenience can hide intent: `if (count)` may be perfectly clear for “nonzero count,” while `if (status)` may be ambiguous if different nonzero values have distinct meanings.

## Boundary-first design

For numeric ranges, decide ownership of endpoints before writing operators. If an age of 18 belongs to the adult category, encode that directly and test 17, 18 and 19. Most conditional bugs live at boundaries, not in the center of a range.

## Mutual exclusivity and exhaustiveness

An `if`/`else if` chain is easier to reason about when each case has a clear predicate and the remaining `else` truly means “all other valid states.” If some states are invalid, reject them explicitly instead of letting them silently fall into a normal branch.

## Name complex predicates

If a condition spans several concepts, compute named booleans or helper functions. `eligible = has_account && age >= 18 && !suspended;` is easier to review than repeating the raw expression in multiple places. In C, an `int` or `_Bool` can represent such predicates; `<stdbool.h>` provides the familiar `bool`, `true` and `false` macros/types for supported language modes.

## Worked example — Partition a numeric domain

```c
const char *classify_temperature(double c) {
    if (c < 0.0) {
        return "below freezing";
    } else if (c == 0.0) {
        return "freezing point";
    } else {
        return "above freezing";
    }
}
```

This example is about branch partitioning, not whether exact floating equality is appropriate for a measured temperature. Domain semantics determine that choice.

## Failure modes to recognize

- Overlapping range tests that leave gaps or duplicate cases
- Encoding invalid input as an ordinary branch
- Using assignment when comparison was intended
- Writing giant conditions that mix several business concepts

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-condition-domain",
  "type": "free-response",
  "prompt": "For the intervals x < 0, 0 <= x < 10, and x >= 10, list the boundary values you would explicitly test and explain why.",
  "answer": "At minimum test values immediately around and on the boundaries: e.g. -1, 0, 9, 10 (and domain-specific extremes). Boundary tests verify that < versus <= choices partition the domain exactly as intended.",
  "explanation": "Branch correctness is largely about boundaries and exhaustiveness."
}
```

```task
{
  "id": "task-c1-branch-table",
  "title": "Design before coding",
  "detail": "For one classification problem of your choice, write a table of input regions and expected outputs before implementing the `if` chain.",
  "estimatedMinutes": 25
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
