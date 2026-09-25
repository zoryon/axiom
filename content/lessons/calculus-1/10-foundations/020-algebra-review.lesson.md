---

{
  "schemaVersion": 1,
  "id": "calc1.algebra-review",
  "title": "Algebraic Manipulation, Equations and Inequalities",
  "subtitle": "Symbolic fluency with explicit domain and equivalence control",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Foundations and the Real Number Line",
  "order": 20,
  "estimatedMinutes": 90,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.sets-numbers"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Manipulate rational and radical expressions while preserving domains",
    "Distinguish equivalence-preserving steps from one-way implications",
    "Solve polynomial and rational inequalities using sign analysis",
    "Check candidate solutions against original equations"
  ],
  "status": "published"
}

---

# Algebraic Manipulation, Equations and Inequalities

Many apparent calculus problems are really algebra problems. The important habit is not “simplify aggressively” but “transform while preserving meaning”. Every cancellation, square, reciprocal or multiplication has conditions.

## Expressions, identities and equations

An expression denotes a value; an equation asserts equality under specified conditions; an identity is true everywhere in its domain. `(x-1)(x+1)=x²-1` is an identity. `x²=1` is a condition with solutions `±1`. Keep the domain attached to the expression throughout manipulation.

## Reversible and non-reversible steps

Adding the same expression to both sides is reversible. Multiplying by a known nonzero quantity is reversible. Squaring is not one-to-one on `ℝ`, so it can create extraneous solutions. Multiplying by an expression that might vanish can lose or introduce cases unless those cases are separated first.

## Rational expressions and cancellation

Factor before cancelling and preserve excluded points. `(x²-1)/(x-1)=x+1` only for `x≠1`; the original expression remains undefined at `1`. In calculus this distinction can create a removable discontinuity and changes whether a formula is continuous at a point.

## Inequalities and sign charts

For products and quotients, find zeros and undefined points, partition the real line, determine signs on each interval, and then include or exclude boundary points according to the relation and domain. Cross-multiplication is dangerous when the multiplier has unknown sign.

## Radicals, exponents and logarithms

Remember `√(x²)=|x|`, not generally `x`. Logarithms require positive arguments. Exponential rules have base restrictions. Domain analysis should come before symbolic manipulation, not after.

## Worked reasoning

Solve `√(x+1)=x-1`. The right side must be nonnegative, so `x≥1`. Squaring gives `x+1=(x-1)²`, hence `x(x-3)=0`; only `x=3` satisfies the original equation. For `(x+1)/(x-2)<0`, critical points `-1` and `2` yield solution `(-1,2)`.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-algebra-01",
  "type": "single-choice",
  "prompt": "What is true of (x²−1)/(x−1)?",
  "options": [
    {
      "id": "a",
      "label": "It equals x+1 for every real x."
    },
    {
      "id": "b",
      "label": "It equals x+1 for x≠1, while the original is undefined at 1."
    },
    {
      "id": "c",
      "label": "It is undefined everywhere."
    },
    {
      "id": "d",
      "label": "Cancellation restores x=1."
    }
  ],
  "answer": "b",
  "explanation": "Check the definition and all domain conditions before choosing."
}
```

```quiz
{
  "id": "q-calc1-algebra-02",
  "type": "free-response",
  "prompt": "Why can squaring both sides create extraneous solutions?",
  "answer": "Because squaring is not injective on the reals: different values such as 2 and −2 have the same square, so the squared equation may have solutions that did not satisfy the original equation.",
  "explanation": "A strong answer states the definition and the reason it applies."
}
```

```exercise
{
  "id": "ex-calc1-algebra-01",
  "title": "Equivalence-safe algebra",
  "difficulty": "Core",
  "brief": "Solve equations and inequalities with rational expressions and radicals while annotating domain restrictions and non-reversible steps.",
  "estimatedMinutes": 50,
  "deliverables": [
    "12 solved problems",
    "domain statement for each problem"
  ],
  "constraints": [
    "Verify candidates in original equations",
    "Use sign charts for rational inequalities"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Treat algebra as a short proof. If each transformation has a stated justification and domain, later limit and derivative calculations become much more dependable.
