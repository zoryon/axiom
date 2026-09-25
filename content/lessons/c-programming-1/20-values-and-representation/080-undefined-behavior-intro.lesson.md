---
{
  "schemaVersion": 1,
  "id": "c1.undefined-behavior-intro",
  "title": "Defined, Implementation-Defined and Undefined Behavior",
  "subtitle": "The semantic categories that determine what portable C may assume",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Values, Types and Representation",
  "order": 80,
  "estimatedMinutes": 85,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.expressions"
  ],
  "tags": [
    "c",
    "systems-programming",
    "values-and-representation"
  ],
  "objectives": [
    "Define undefined, unspecified and implementation-defined behavior at an introductory level",
    "Explain why “it worked on my machine” does not validate undefined behavior",
    "Recognize several high-frequency UB patterns",
    "Use compiler/sanitizer observations as evidence without confusing them with language guarantees"
  ],
  "status": "published"
}
---
# Defined, Implementation-Defined and Undefined Behavior

C deliberately leaves some matters to implementations and places no requirements at all on programs that execute undefined behavior. This is one of the most important ideas in the language. It affects portability, optimization, debugging and security. A program is not made correct because one build printed the value you expected.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Three categories you must not conflate

*Implementation-defined* behavior gives the implementation a choice that it must document. *Unspecified* behavior permits one of several possibilities without requiring the implementation to document which occurs in each instance. *Undefined behavior* imposes no requirements for that execution once the undefined operation is reached.

These labels are technical. Do not use “undefined” casually to mean “I do not know what happens.”

## Why optimizers care

Optimizers reason under the assumption that a strictly conforming execution does not perform undefined operations. If signed overflow is undefined, an optimizer may transform conditions based on the mathematical fact that valid executions cannot overflow. The surprising result is not that the optimizer “caused UB”; it is that the source had already left the language contract.

## Frequent beginner sources

Out-of-bounds array access, invalid pointer dereference, signed overflow, using certain indeterminate values, division by zero and incompatible format arguments are classic sources. Later lessons will sharpen the exact rules around lifetime and pointers.

A useful habit is to ask whether every object access names a live object, whether every index is within its valid range, and whether every arithmetic operation remains in its type domain.

## Tools detect cases, not the entire concept

Compiler warnings and runtime sanitizers can catch many undefined operations, but no finite set of tool runs proves absence. Sanitizers also change execution. Treat them as powerful testing instruments alongside static reasoning, not as an alternative to understanding the semantics.

## Worked example — Signed overflow is not a portability trick

```c
#include <limits.h>

int f(int x) {
    return x + 1 > x;
}

/* Calling f(INT_MAX) attempts signed overflow in x + 1.
   Do not reason as though wraparound were guaranteed. */
```

A compiler may optimize `f` under the rules for defined executions. The dangerous assumption is expecting two’s-complement wrap for signed arithmetic merely because the hardware uses it.

## Failure modes to recognize

- Calling any surprising result “undefined behavior” without identifying the violated rule
- Assuming debug builds reveal what release builds must do
- Using sanitizer silence as proof of portability
- Depending on signed overflow or out-of-bounds reads because tests appeared stable

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-ub-observation",
  "type": "single-choice",
  "prompt": "A program containing undefined behavior prints 42 in ten runs. What can you conclude from the C language contract?",
  "options": [
    {
      "id": "a",
      "label": "It is guaranteed to print 42 forever"
    },
    {
      "id": "b",
      "label": "The behavior becomes implementation-defined"
    },
    {
      "id": "c",
      "label": "Those runs are observations, not a language guarantee"
    },
    {
      "id": "d",
      "label": "The compiler must issue an error"
    }
  ],
  "answer": "c",
  "explanation": "Undefined behavior is not repaired by repeated observations on one build."
}
```

```exercise
{
  "id": "ex-c1-ub-classification",
  "title": "Classify behavior cases",
  "difficulty": "Core",
  "brief": "Analyze a set of small C snippets and classify each as defined, implementation-defined, unspecified, constraint violation, or undefined where applicable. Explain the specific operation that drives the classification.",
  "estimatedMinutes": 70,
  "deliverables": [
    "classification.md"
  ],
  "constraints": [
    "Do not use runtime output as your primary argument",
    "Cite compiler documentation only for implementation-defined choices"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
