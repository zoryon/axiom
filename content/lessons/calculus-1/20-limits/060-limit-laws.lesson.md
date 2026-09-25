---

{
  "schemaVersion": 1,
  "id": "calc1.limit-laws",
  "title": "Limit Laws and Algebraic Techniques",
  "subtitle": "Combining known limits and removing indeterminate forms by structure-preserving algebra",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Limits",
  "order": 60,
  "estimatedMinutes": 100,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.limit-intuition"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Apply sum, product, quotient and composition limit laws with their hypotheses",
    "Evaluate polynomial and rational limits by substitution where justified",
    "Resolve common 0/0 forms using factoring and rationalization",
    "Recognize when a limit law cannot be applied directly"
  ],
  "status": "published"
}

---

# Limit Laws and Algebraic Techniques

Limit laws turn simple convergence facts into a calculus for more complicated expressions. They are powerful because they are theorem-backed rules, not pattern matching. Every law has hypotheses—especially quotient and composition rules.

## Algebra of limits

If `f(x)→L` and `g(x)→M`, then sums, differences and scalar multiples converge to the corresponding combinations. Products converge to `LM`; quotients converge to `L/M` provided `M≠0` and the denominator stays nonzero nearby. Integer powers and roots behave continuously on their natural domains.

## Direct substitution as a theorem consequence

Polynomials are continuous, so polynomial limits can be evaluated by substitution. Rational functions are continuous where their denominator is nonzero. “Plugging in” is therefore justified in these cases; it is not an independent universal method.

## Factoring removable zeros

When substitution yields `0/0`, look for a common vanishing factor. For `(x²-a²)/(x-a)`, factor the numerator and cancel for `x≠a`; the limit becomes `2a`. Cancellation is legal because limits inspect a punctured neighborhood, but it does not redefine the original function at the missing point.

## Rationalization

Radicals often reveal cancellation after multiplying by a conjugate. For `(√(x+1)-1)/x` as `x→0`, multiply by `√(x+1)+1`; the numerator becomes `x`, leaving `1/(√(x+1)+1)` and limit `1/2`.

## Squeeze reasoning preview

Sometimes exact simplification is difficult but bounds are easy. If `g(x)≤f(x)≤h(x)` near `a` and both outer functions approach `L`, then `f(x)→L`. This squeeze theorem will repeatedly handle oscillatory factors multiplied by quantities that shrink to zero.

## Worked reasoning

Evaluate `lim_{x→3}(x²-9)/(x-3)`. Factor to `(x-3)(x+3)/(x-3)=x+3` on the punctured neighborhood, yielding `6`. For `lim_{x→0} x² sin(1/x)`, use `-1≤sin(1/x)≤1`, so `-x²≤x²sin(1/x)≤x²`; both bounds tend to zero, hence the limit is zero.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-limit-laws-01",
  "type": "single-choice",
  "prompt": "When may the quotient law be used directly for f(x)/g(x)?",
  "options": [
    {
      "id": "a",
      "label": "Whenever both limits exist, even if g→0."
    },
    {
      "id": "b",
      "label": "When both limits exist and the limiting denominator is nonzero."
    },
    {
      "id": "c",
      "label": "Only for polynomial functions."
    },
    {
      "id": "d",
      "label": "Only if f(a) and g(a) are defined."
    }
  ],
  "answer": "b",
  "explanation": "The correct option follows from the limit definition or a valid limit law."
}
```

```quiz
{
  "id": "q-calc1-limit-laws-02",
  "type": "free-response",
  "prompt": "Why is cancelling x−a legitimate in a limit after factoring, even though x=a would make the factor zero?",
  "answer": "A limit as x→a concerns values with x near but not equal to a. If two expressions agree on a punctured neighborhood of a, they have the same limit there.",
  "explanation": "A strong response separates what happens near the point from what happens exactly at the point."
}
```

```exercise
{
  "id": "ex-calc1-limit-laws-01",
  "title": "Algebraic limit techniques",
  "difficulty": "Core",
  "brief": "Evaluate 14 limits using direct substitution, factoring, rationalization or squeezing, and name the justification used.",
  "estimatedMinutes": 60,
  "deliverables": [
    "14 worked limits",
    "method label for each solution"
  ],
  "constraints": [
    "Do not use derivatives or L’Hôpital’s rule",
    "Preserve domain restrictions"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

A good limit solution is not merely a sequence of algebraic steps. It identifies why the original expression resists substitution, changes representation on a punctured neighborhood, and then invokes valid limit laws.
