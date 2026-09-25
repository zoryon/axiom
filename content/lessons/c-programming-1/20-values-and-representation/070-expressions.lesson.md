---
{
  "schemaVersion": 1,
  "id": "c1.expressions",
  "title": "Expressions, Operators and Conversions",
  "subtitle": "Types, values, precedence, evaluation and conversions inside C expressions",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Values, Types and Representation",
  "order": 70,
  "estimatedMinutes": 90,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.floating-point-intro"
  ],
  "tags": [
    "c",
    "systems-programming",
    "values-and-representation"
  ],
  "objectives": [
    "Parse expressions using precedence and associativity rather than visual intuition",
    "Distinguish value computation from side effects",
    "Predict the major implicit conversions in mixed arithmetic",
    "Rewrite clever expressions into auditable steps"
  ],
  "status": "published"
}
---
# Expressions, Operators and Conversions

Expressions are where C compresses a great deal of semantics into little syntax. A line can perform conversions, read objects, modify objects, call functions and choose values. Professional C style often favors *less* density than the grammar allows because auditability matters more than cleverness.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Precedence is grammar, not execution timing

Operator precedence determines how tokens group. It does not, by itself, specify the order in which every operand is evaluated. Parentheses can make grouping explicit, but they do not universally impose a sequencing rule on subexpressions.

This distinction matters whenever expressions have side effects. If a computation is difficult to reason about without memorizing sequencing rules, split it into statements.

## Conversions can change the mathematical domain

Usual arithmetic conversions can turn a comparison into unsigned arithmetic or widen a smaller type. Assignment converts the computed value to the destination type. Function calls convert arguments according to declared parameter types. Each boundary can lose information or alter interpretation.

A cast is an explicit conversion request, not a proof of safety. Good casts document a conversion that is already justified by invariants.

## Short-circuit operators encode control flow

`&&` and `||` evaluate left to right and conditionally skip the right operand. That makes expressions such as `p != NULL && *p > 0` useful: dereferencing happens only when the first condition succeeds. This is a sequencing guarantee you can intentionally rely on.

The conditional operator `?:` likewise selects one of two operands after evaluating its condition, but its type rules can still trigger conversions worth inspecting.

## Side effects deserve boundaries

Expressions such as `a[i++] = i;` are poor learning and production code even before asking whether a particular form has undefined or unspecified behavior. Separate state changes so that each statement has an obvious before/after model. Code is read far more often than it is typed.

## Worked example — Make conversions visible

```c
#include <stdio.h>

int main(void) {
    int debt = -1;
    unsigned int count = 1;

    if (debt < count) {
        puts("comparison was true");
    } else {
        puts("comparison was false");
    }
}
```

Predict the usual arithmetic conversion before running this. Then compile with signed/unsigned comparison warnings and explain the result.

## Failure modes to recognize

- Using precedence tables as a substitute for parentheses in human-facing code
- Assuming left-to-right textual order for all operand evaluation
- Using casts to silence signedness warnings
- Combining several mutations into one expression

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-precedence-order",
  "type": "single-choice",
  "prompt": "What does operator precedence primarily determine?",
  "options": [
    {
      "id": "a",
      "label": "CPU clock order"
    },
    {
      "id": "b",
      "label": "How expression tokens group syntactically"
    },
    {
      "id": "c",
      "label": "Link order"
    },
    {
      "id": "d",
      "label": "Object lifetime"
    }
  ],
  "answer": "b",
  "explanation": "Precedence/associativity determine grouping. Evaluation sequencing is a separate semantic question."
}
```

```exercise
{
  "id": "ex-c1-expression-audit",
  "title": "Audit and simplify expression-heavy code",
  "difficulty": "Core",
  "brief": "Given a supplied set of dense expressions, rewrite each into explicit statements while preserving defined behavior. Annotate every implicit conversion that remains.",
  "estimatedMinutes": 55,
  "deliverables": [
    "audit.c",
    "reasoning.md"
  ],
  "constraints": [
    "No behavior-changing casts",
    "Each side effect must be isolated when practical"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
