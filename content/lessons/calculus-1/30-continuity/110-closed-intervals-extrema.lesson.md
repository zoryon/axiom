---

{
  "schemaVersion": 1,
  "id": "calc1.compactness-one-variable",
  "title": "Closed Intervals, Extrema and Key Theorems",
  "subtitle": "Boundedness, attained extrema and uniform behavior on closed bounded intervals",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Continuity",
  "order": 110,
  "estimatedMinutes": 95,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.ivt"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "State the Extreme Value Theorem",
    "Explain the special role of closed bounded intervals",
    "Use continuity plus compact-interval hypotheses to prove boundedness and attainment of extrema",
    "Distinguish supremum/infimum from maximum/minimum"
  ],
  "status": "published"
}

---

# Closed Intervals, Extrema and Key Theorems

Closed bounded intervals are unusually well behaved. A continuous function on `[a,b]` cannot blow up, cannot fail to attain its highest and lowest values, and enjoys stronger global control than continuity at isolated points suggests.

## Extreme Value Theorem

If `f` is continuous on a closed bounded interval `[a,b]`, then `f` is bounded there and attains both a maximum and a minimum: there exist points `x_min,x_max∈[a,b]` whose values bound every other function value on the interval.

## Why closed and bounded matter

On the open interval `(0,1)`, `f(x)=x` is continuous and bounded but has neither maximum nor minimum. On `[1,∞)`, `f(x)=x` is continuous but unbounded. The theorem needs both endpoint inclusion and finite extent.

## Attainment versus bounds

A supremum is a number; an attained maximum is a function value at an actual point. EVT upgrades boundedness to attainment. This distinction becomes crucial in optimization: a theoretical best value is only useful if some feasible input achieves it.

## Global consequences from local continuity

Continuity is defined pointwise, yet on a compact interval it yields global facts. In more advanced analysis, this comes from compactness: every open cover admits a finite subcover, and continuous images of compact sets are compact. You do not need the general topology yet, but this is the structural reason the theorem is so robust.

## Uniform continuity preview

Continuous functions on `[a,b]` are uniformly continuous: a single δ can work across the entire interval for a given ε. Ordinary continuity permits δ to depend on the point. This stronger result matters in integration and numerical approximation.

## Worked reasoning

`f(x)=x(1-x)` is continuous on `[0,1]`, so EVT guarantees extrema exist before we calculate them. Later derivative methods locate the maximum at `x=1/2`. The theorem separates the question “does an optimizer exist?” from “how do we find it?”

## Practice and retrieval

```quiz
{
  "id": "q-calc1-evt-01",
  "type": "single-choice",
  "prompt": "Which hypotheses guarantee a continuous real-valued function attains both maximum and minimum?",
  "options": [
    {
      "id": "a",
      "label": "Any open interval."
    },
    {
      "id": "b",
      "label": "Any bounded domain."
    },
    {
      "id": "c",
      "label": "Continuity on a closed bounded interval [a,b]."
    },
    {
      "id": "d",
      "label": "Differentiability at one point."
    }
  ],
  "answer": "c",
  "explanation": "Use the formal continuity statement and the theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-evt-02",
  "type": "free-response",
  "prompt": "Give an example showing why a closed interval matters in EVT.",
  "answer": "f(x)=x on (0,1) is continuous and bounded, but it attains neither its supremum 1 nor infimum 0 because the endpoints are excluded.",
  "explanation": "A complete response names the relevant limit and hypothesis."
}
```

```exercise
{
  "id": "ex-calc1-evt-01",
  "title": "Existence before computation",
  "difficulty": "University",
  "brief": "For several functions/domains, decide whether EVT applies, what it guarantees, and construct counterexamples when a hypothesis is removed.",
  "estimatedMinutes": 45,
  "deliverables": [
    "8 theorem-applicability analyses",
    "three counterexamples"
  ],
  "constraints": [
    "Separate existence claims from computed extrema"
  ],
  "language": "math"
}
```

```task
{
  "id": "task-calc1-continuity-theorem-map",
  "title": "Continuity theorem map",
  "detail": "Create a one-page map connecting continuity, IVT, root existence, EVT, boundedness, and attained extrema. Put every hypothesis next to its conclusion.",
  "estimatedMinutes": 25
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

The habit to build is theorem-first reasoning: before calculating, ask what existence and boundedness are guaranteed by structure. Closed bounded intervals will recur in integration, approximation and numerical methods because they turn local regularity into global control.
