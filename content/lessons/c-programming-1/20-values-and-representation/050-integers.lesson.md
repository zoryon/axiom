---
{
  "schemaVersion": 1,
  "id": "c1.integers",
  "title": "Integer Types, Ranges and Signedness",
  "subtitle": "Integer types as finite mathematical domains with representation and conversion rules",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Values, Types and Representation",
  "order": 50,
  "estimatedMinutes": 85,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.diagnostics"
  ],
  "tags": [
    "c",
    "systems-programming",
    "values-and-representation"
  ],
  "objectives": [
    "Explain why C integer types have finite ranges",
    "Use `<limits.h>` and fixed-width integer types appropriately",
    "Differentiate signed and unsigned arithmetic behavior",
    "Predict common integer promotions and overflow hazards"
  ],
  "status": "published"
}
---
# Integer Types, Ranges and Signedness

An `int` is not the mathematical set of all integers. It is a finite machine-oriented type whose exact width is implementation-dependent within language constraints. Once you internalize that, overflow, conversions, indexing bugs and security failures stop looking like random edge cases and start looking like domain errors.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Ranges are properties of the implementation

C specifies minimum ranges and relationships, not one universal bit width for every basic integer type. Modern desktop systems commonly use 8-bit bytes, 32-bit `int` and 64-bit pointers, but portable C does not let you infer those facts from the spelling `int` or `long` alone.

Use `<limits.h>` when the natural type is a basic integer type and `<stdint.h>` when exact-width or minimum-width semantics are part of an interface. Exact-width typedefs such as `int32_t` exist only when the implementation has a suitable exact representation.

## Signed and unsigned are not interchangeable styles

Unsigned arithmetic is defined modulo one more than the maximum value of the type, so wrapping is a defined arithmetic result. Signed overflow, by contrast, is undefined behavior. This asymmetry affects optimizations and security checks.

Unsigned types are excellent for bit masks and domains that truly use modular arithmetic. They are not automatically the “safe type for non-negative numbers.” Subtraction, comparisons against signed values and sentinel conventions can become more error-prone.

## Promotions happen before many operations

Small integer types such as `char` and `short` usually undergo integer promotion before arithmetic. Binary operators then apply the usual arithmetic conversions to reach a common type. As a result, the type you wrote for an object is not always the type in which an expression is evaluated.

The right strategy is to model value ranges first, then understand the conversions that the operator applies. Casting after the fact often hides rather than solves the mismatch.

## Sizes and counts deserve purpose-built types

`size_t` is the unsigned integer type used to represent object sizes and is the result type of `sizeof`. It is the natural type for counts that are specifically sizes of objects or arrays. But when you need differences between positions, `ptrdiff_t` may be the right abstraction. Type choice should communicate the domain, not merely silence warnings.

## Worked example — Observe your implementation

```c
#include <limits.h>
#include <stdint.h>
#include <stdio.h>

int main(void) {
    printf("CHAR_BIT=%d\n", CHAR_BIT);
    printf("INT_MIN=%d INT_MAX=%d\n", INT_MIN, INT_MAX);
    printf("sizeof(int)=%zu\n", sizeof(int));
    printf("sizeof(size_t)=%zu\n", sizeof(size_t));
}
```

Observation tells you about one implementation. Portability comes from knowing which observations are guaranteed and which are not.

## Failure modes to recognize

- Assuming `int` is always 32 bits
- Using unsigned merely to forbid negative values
- Relying on signed overflow wrapping
- Mixing signed loop counters with `size_t` without thinking through conversions

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-signed-overflow",
  "type": "single-choice",
  "prompt": "In portable C, what is the language status of signed integer overflow in ordinary arithmetic?",
  "options": [
    {
      "id": "a",
      "label": "Guaranteed modulo wrap"
    },
    {
      "id": "b",
      "label": "Undefined behavior"
    },
    {
      "id": "c",
      "label": "A required compile-time error"
    },
    {
      "id": "d",
      "label": "Always saturation"
    }
  ],
  "answer": "b",
  "explanation": "Unsigned arithmetic has defined modulo behavior; ordinary signed overflow is undefined."
}
```

```quiz
{
  "id": "q-c1-sizeof-type",
  "type": "single-choice",
  "prompt": "What is the type of the result of `sizeof`?",
  "options": [
    {
      "id": "a",
      "label": "int"
    },
    {
      "id": "b",
      "label": "long"
    },
    {
      "id": "c",
      "label": "size_t"
    },
    {
      "id": "d",
      "label": "ptrdiff_t"
    }
  ],
  "answer": "c",
  "explanation": "`sizeof` yields a value of type `size_t`."
}
```

```exercise
{
  "id": "ex-c1-integer-ranges",
  "title": "Build a range-aware integer report",
  "difficulty": "Core",
  "brief": "Write a program that reports integer limits and demonstrates several conversions without invoking undefined behavior. For each output, explain why the result is required or implementation-dependent.",
  "estimatedMinutes": 60,
  "deliverables": [
    "ranges.c",
    "analysis.md"
  ],
  "constraints": [
    "No assumptions about int width",
    "Compile with conversion warnings if supported"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
