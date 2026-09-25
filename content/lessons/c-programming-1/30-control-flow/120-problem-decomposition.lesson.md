---
{
  "schemaVersion": 1,
  "id": "c1.problem-decomposition",
  "title": "Decomposing Problems into Executable Steps",
  "subtitle": "Turn requirements into data, invariants, transformations and testable functions",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Control Flow and Program Reasoning",
  "order": 120,
  "estimatedMinutes": 90,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.state-tracing"
  ],
  "tags": [
    "c",
    "systems-programming",
    "control-flow"
  ],
  "objectives": [
    "Translate a small problem statement into explicit inputs, outputs and invariants",
    "Separate parsing, computation and presentation responsibilities",
    "Design a function decomposition before implementation",
    "Choose representations that simplify correctness arguments"
  ],
  "status": "published"
}
---
# Decomposing Problems into Executable Steps

Programming begins before syntax. A good decomposition makes many bugs impossible because each component has a narrow contract. A bad decomposition forces every function to know everything: input format, storage layout, business rules and output formatting. Your goal is to build a chain of small transformations whose responsibilities are easy to state.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Start from contracts, not functions

Write down the accepted inputs, required outputs, invalid cases and relevant bounds. Only then choose functions. “Read temperatures and print the mean” hides several decisions: how many values, how input terminates, what invalid text means, whether zero values is allowed, and what precision the output needs.

## Separate boundary work from pure computation

Parsing input and formatting output depend on external representation. Core calculations often do not. A function that computes a mean from an array is easier to test than a function that simultaneously reads from `stdin`, computes, and prints.

This separation is one of the earliest forms of architecture. It scales directly to web handlers, database layers and distributed services.

## Represent invariants in types and interfaces where possible

C’s type system is relatively permissive, but representation still matters. A count should not be mixed with an arbitrary status code in one variable. A function should not accept a pointer/count pair whose relationship is undocumented. If a value has a valid range, state it in the precondition and test boundaries.

## Decomposition is iterative

Do not seek a perfect function tree before coding. Draft a design, implement one path, notice responsibilities that do not belong together, and refactor. The skill is recognizing *why* a boundary is useful: independent testing, different rates of change, clearer invariants or reduced coupling.

## Worked example — A small interface boundary

```c
#include <stddef.h>
#include <stdbool.h>

bool mean_of(const double *values, size_t count, double *out_mean);
```

Even before implementation, the signature forces questions: may `values` be null when count is zero? Must `out_mean` be non-null? What happens for zero elements? Those become part of the contract.

## Failure modes to recognize

- Starting with one giant `main` and postponing design indefinitely
- Creating a function for every three lines without a meaningful responsibility
- Letting I/O concerns leak into otherwise reusable calculations
- Using comments to explain an interface whose types/names could be clearer

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-decomposition",
  "type": "single-choice",
  "prompt": "Which decomposition generally makes a numeric algorithm easiest to unit test?",
  "options": [
    {
      "id": "a",
      "label": "One function that reads stdin, computes, and prints"
    },
    {
      "id": "b",
      "label": "A computation function separated from input parsing and output formatting"
    },
    {
      "id": "c",
      "label": "A macro containing the whole program"
    },
    {
      "id": "d",
      "label": "A global variable updated from many functions"
    }
  ],
  "answer": "b",
  "explanation": "Separating boundary I/O from computation reduces dependencies and makes deterministic testing straightforward."
}
```

```lab
{
  "id": "lab-c1-statistics-cli-design",
  "title": "Design a small statistics program before coding",
  "brief": "Produce a design for a CLI that accepts a bounded sequence of numeric values, validates them, computes count/min/max/mean, and reports errors clearly. Implement only after the interfaces, invariants and test cases are written.",
  "estimatedMinutes": 120,
  "deliverables": [
    "design.md",
    "stats.c",
    "tests.md"
  ],
  "rubric": [
    "Requirement clarity",
    "Function boundaries",
    "Boundary cases",
    "Readable C",
    "Justification of representation choices"
  ]
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
