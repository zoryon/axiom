---

{
  "schemaVersion": 1,
  "id": "calc1.power-series",
  "title": "Power Series and Taylor Series",
  "subtitle": "Functions represented by infinite polynomial expansions and their intervals of convergence",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Sequences and Series",
  "order": 280,
  "estimatedMinutes": 110,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.convergence-tests"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Determine radius and interval of convergence for power series",
    "Differentiate and integrate power series within their convergence interval",
    "Connect Taylor coefficients to derivatives",
    "Distinguish a Taylor series from guaranteed equality with the original function"
  ],
  "status": "published"
}

---

# Power Series and Taylor Series

A power series is an infinite polynomial-like object `Σ c_n(x-a)^n`. Inside its radius of convergence it behaves remarkably well: it defines a function that can be differentiated and integrated term by term. Taylor series are the special power series whose coefficients come from derivatives of a function.

## Radius and interval

Every power series has a radius `R∈[0,∞]` such that it converges absolutely for `|x-a|<R` and diverges for `|x-a|>R`. Endpoints must be tested separately. Ratio or root tests usually reveal `R`.

## Termwise calculus

Inside the radius of convergence, `Σc_n(x-a)^n` may be differentiated and integrated term by term, and the derived series has the same radius. This gives a powerful engine for constructing new expansions from known ones.

## Taylor series

The Taylor series of a sufficiently differentiable function about `a` is `Σ f^{(n)}(a)(x-a)^n/n!`. This is the infinite continuation of Taylor polynomials. But derivative data alone does not automatically guarantee the series equals the function away from the center.

## Remainder criterion

Equality `f(x)=Σ...` is established when the Taylor remainders `R_n(x)` tend to zero. For standard analytic functions such as `e^x`, `sin x`, `cos x`, and suitable logarithmic/geometric forms, this can be proved on their relevant intervals.

## Generating expansions

From `1/(1-x)=Σx^n` for `|x|<1`, substitution gives `1/(1+x²)=Σ(-1)^n x^{2n}` for `|x|<1`; integrating termwise yields an arctangent series. This shows how one seed identity generates families of expansions.

## Worked reasoning

For `Σ (x-2)^n/(n 3^n)`, ratio/root analysis gives radius `R=3`. Test endpoints separately: at `x=5` the terms become `1/n`, which diverges; at `x=-1` they become `(-1)^n/n`, which converges conditionally. Thus interval `[-1,5)` with endpoint behavior stated explicitly.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-power-01",
  "type": "single-choice",
  "prompt": "For a power series, what must usually be checked separately after finding the radius of convergence?",
  "options": [
    {
      "id": "a",
      "label": "The center only."
    },
    {
      "id": "b",
      "label": "The endpoints of the candidate interval."
    },
    {
      "id": "c",
      "label": "Every rational input."
    },
    {
      "id": "d",
      "label": "Whether coefficients are integers."
    }
  ],
  "answer": "b",
  "explanation": "Use the convergence definition and the stated test hypotheses."
}
```

```quiz
{
  "id": "q-calc1-power-02",
  "type": "free-response",
  "prompt": "Why is a Taylor series not automatically equal to its generating function?",
  "answer": "Matching all formal derivative coefficients is not sufficient by itself; one must show the Taylor remainder tends to zero (or otherwise prove equality) on the region of interest.",
  "explanation": "A complete answer should identify the convergence mechanism, not only the final value."
}
```

```exercise
{
  "id": "ex-calc1-power-01",
  "title": "Power-series analysis",
  "difficulty": "University",
  "brief": "Find radii/intervals of convergence and derive expansions using substitution, differentiation and integration of known series.",
  "estimatedMinutes": 80,
  "deliverables": [
    "10 convergence intervals",
    "four derived power-series identities"
  ],
  "constraints": [
    "Test both endpoints explicitly",
    "State the region on which each derived identity is valid"
  ],
  "language": "math"
}
```

```task
{
  "id": "task-calc1-series-table",
  "title": "Convergence test decision table",
  "detail": "Build a one-page decision table for geometric, p-series, comparison, limit comparison, ratio, root, and power-series endpoint checks. Include one example trigger for each.",
  "estimatedMinutes": 30
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Power series unify approximation, exact representation and computation. They are also a first encounter with a recurring analysis theme: operations are safe inside a convergence region only because theorems justify exchanging limits with algebraic or differential operations.
