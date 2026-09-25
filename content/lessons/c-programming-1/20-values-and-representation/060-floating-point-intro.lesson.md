---
{
  "schemaVersion": 1,
  "id": "c1.floating-point-intro",
  "title": "Floating-Point Representation: First Principles",
  "subtitle": "Why real-number computation is approximate and how to reason about that approximation",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Values, Types and Representation",
  "order": 60,
  "estimatedMinutes": 90,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.integers"
  ],
  "tags": [
    "c",
    "systems-programming",
    "values-and-representation"
  ],
  "objectives": [
    "Explain finite floating-point representation conceptually",
    "Recognize why many decimal fractions are not represented exactly in binary floating point",
    "Use tolerances based on problem scale rather than naive equality",
    "Identify overflow, underflow, rounding and special values at an introductory level"
  ],
  "status": "published"
}
---
# Floating-Point Representation: First Principles

Floating-point numbers are not “decimals with a dot.” They are finite encodings designed to cover a very wide dynamic range with limited precision. The central engineering lesson is that the represented value is often a nearby approximation, and arithmetic is rounded back into the representable set after operations.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## A finite grid of representable values

A binary floating-point format stores information analogous to sign, significand and exponent. Values are not uniformly spaced across the entire number line: spacing grows as magnitude grows. This lets the format represent both tiny and huge values, but the number of significant binary digits is finite.

You therefore cannot ask merely “is this number representable?” You must also ask “with what precision near this magnitude?”

## Why `0.1` is troublesome

Just as one third repeats forever in base 10, one tenth repeats forever in base 2. A finite binary floating-point value stores a rounded approximation. When several rounded quantities are combined, the final printed decimal may expose a small difference from the mathematical ideal.

This is normal, not corruption. The bug is often an algorithm or comparison that assumes exact real arithmetic.

## Equality depends on semantics

For values produced by computation, comparing with `==` is often wrong if the domain expects approximate arithmetic. But replacing every equality test with a universal `1e-6` is also wrong. A good tolerance considers the scale of the quantities, error accumulated by the algorithm and the domain requirement.

Some floating-point values are exactly representable, and exact comparisons can be appropriate for sentinel states or carefully constrained calculations. Rules of thumb must not replace reasoning.

## Special values and exceptional ranges

IEC 60559 / IEEE-style implementations commonly support infinities, signed zero and NaNs, and C exposes facilities in `<math.h>` and `<float.h>` for reasoning about capabilities. You will study numerical stability later; here the aim is to stop pretending the real-number model and machine model are identical.

## Worked example — Observe approximation

```c
#include <stdio.h>

int main(void) {
    double x = 0.1;
    double y = 0.2;
    double z = 0.3;

    printf("%.17g\n", x + y);
    printf("%.17g\n", z);
}
```

The exact output is implementation-sensitive, but on common binary floating-point systems the extra digits reveal that the two stored approximations need not be identical.

## Failure modes to recognize

- Treating `double` as exact real arithmetic
- Using one fixed epsilon for every scale and algorithm
- Assuming more printed digits means more stored precision
- Using floating point for quantities requiring exact decimal rules without evaluating alternatives

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-fp-decimal",
  "type": "single-choice",
  "prompt": "Why can storing decimal 0.1 in a binary floating-point type involve approximation?",
  "options": [
    {
      "id": "a",
      "label": "The compiler randomly changes literals"
    },
    {
      "id": "b",
      "label": "0.1 has an infinite repeating representation in base 2 for ordinary binary formats"
    },
    {
      "id": "c",
      "label": "C forbids decimal literals"
    },
    {
      "id": "d",
      "label": "Floating point stores only integers"
    }
  ],
  "answer": "b",
  "explanation": "A finite binary significand must round values whose binary expansion does not terminate."
}
```

```task
{
  "id": "task-c1-fp-observation",
  "title": "Inspect precision at different magnitudes",
  "detail": "Write a small program that adds a small value to increasingly large doubles. Record when the addition stops changing the stored result on your implementation and explain the observation qualitatively.",
  "estimatedMinutes": 35
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
