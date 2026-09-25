---

{
  "schemaVersion": 1,
  "id": "calc1.riemann",
  "title": "Riemann Sums and the Definite Integral",
  "subtitle": "Accumulation as a limit of weighted sums and the rigorous meaning of area",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Integral Calculus",
  "order": 210,
  "estimatedMinutes": 110,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.optimization"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Construct left, right and general Riemann sums",
    "Define the definite integral as a limit of sums",
    "Interpret signed area and accumulated quantity",
    "Recognize basic sufficient conditions for Riemann integrability"
  ],
  "status": "published"
}

---

# Riemann Sums and the Definite Integral

Integration begins with a discrete approximation: split an interval, sample the function, multiply height by width, and add. The definite integral is what remains when the partition becomes arbitrarily fine in a controlled way.

## Partitions and sums

A partition `P` of `[a,b]` is a finite sequence `a=x_0<...<x_n=b`. On each subinterval choose a sample point `ξ_i`. The Riemann sum is `Σ f(ξ_i)Δx_i`, where `Δx_i=x_i-x_{i-1}`. Left/right/midpoint sums differ only in how the sample is chosen.

## Definition of the integral

A bounded function is Riemann integrable if there exists a number `I` such that all sufficiently fine tagged partitions produce sums close to `I`. For uniform partitions, elementary courses often present the limit `lim_{n→∞} Σ f(x_i^*)Δx`; the full definition emphasizes that the answer does not depend on a special sampling rule.

## Signed accumulation

The integral counts signed contribution: regions where `f<0` subtract. Geometric area between a graph and the axis uses `∫|f|` or a piecewise sign analysis. In applications, the integrand may be density, flow, velocity, power or any rate per unit input; multiplying by a small width creates a small contribution.

## Integrability

Every continuous function on `[a,b]` is Riemann integrable. Bounded functions with finitely many jump discontinuities are also integrable. Highly pathological discontinuity sets require deeper analysis, but the key distinction is between “has an antiderivative formula” and “is integrable”: these are not the same question.

## Properties

Integrals are linear, additive over adjacent intervals, and respect order: if `f≤g`, then `∫f≤∫g`. Also `|∫f|≤∫|f|`. These follow naturally from sum properties and survive the limiting process.

## Worked reasoning

For `f(x)=x` on `[0,1]`, right sums with `n` equal subintervals are `(1/n)Σ_{i=1}^n i/n = [n(n+1)/2]/n² → 1/2`. The familiar triangular area is recovered from a limit of sums rather than assumed.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-riemann-01",
  "type": "single-choice",
  "prompt": "What does a Riemann sum approximate?",
  "options": [
    {
      "id": "a",
      "label": "A derivative at one point."
    },
    {
      "id": "b",
      "label": "Accumulated signed contribution over an interval."
    },
    {
      "id": "c",
      "label": "Only geometric area above the axis."
    },
    {
      "id": "d",
      "label": "A root of the function."
    }
  ],
  "answer": "b",
  "explanation": "Use the definition or theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-riemann-02",
  "type": "free-response",
  "prompt": "Why can a definite integral be negative?",
  "answer": "The definite integral is signed accumulation. Contributions from intervals where the function is below the axis are negative, so they may outweigh positive contributions.",
  "explanation": "A complete answer should connect accumulation, area and antiderivatives precisely."
}
```

```exercise
{
  "id": "ex-calc1-riemann-01",
  "title": "Riemann-sum construction",
  "difficulty": "University",
  "brief": "Build left/right/midpoint sums, express them in sigma notation, and compute four simple definite integrals directly from limits of sums.",
  "estimatedMinutes": 70,
  "deliverables": [
    "8 finite-sum constructions",
    "4 limit evaluations"
  ],
  "constraints": [
    "Do not use the Fundamental Theorem of Calculus for the direct-limit problems"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

The Riemann integral is not “area by formula”; it is a limit process that turns many small local contributions into a global quantity. That accumulation viewpoint is the one that generalizes.
