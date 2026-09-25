---

{
  "schemaVersion": 1,
  "id": "calc1.continuity-definition",
  "title": "Continuity and Types of Discontinuity",
  "subtitle": "Pointwise continuity, continuity on intervals, and a taxonomy of failures",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Continuity",
  "order": 90,
  "estimatedMinutes": 85,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.epsilon-delta"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "State continuity at a point as a limit equality",
    "Classify removable, jump and infinite discontinuities",
    "Determine continuity domains of elementary combinations",
    "Relate epsilon-delta continuity to local stability"
  ],
  "status": "published"
}

---

# Continuity and Types of Discontinuity

Continuity is the condition that a function’s local limit agrees with its actual value. It captures the idea that sufficiently small input changes cause sufficiently small output changes, but the formal definition makes that intuition exact.

## Pointwise definition

A function `f` is continuous at `a` when `a` lies in its domain, `lim_{x→a}f(x)` exists, and that limit equals `f(a)`. Equivalently: for every `ε>0` there exists `δ>0` such that `|x-a|<δ` implies `|f(x)-f(a)|<ε`.

## Continuity on sets

A function is continuous on an open interval if it is continuous at every point. At an endpoint of a closed interval, continuity uses the appropriate one-sided limit. Polynomials are continuous everywhere; rational functions are continuous wherever their denominator is nonzero; compositions of continuous functions are continuous where the composition is defined.

## Discontinuity types

A removable discontinuity occurs when a finite limit exists but the value is missing or wrong. A jump discontinuity occurs when finite one-sided limits exist but differ. An infinite discontinuity involves unbounded behavior near the point. Oscillatory failures, such as `sin(1/x)` at zero, need not fit the first three simple categories.

## Repairing a removable discontinuity

If `lim_{x→a}f(x)=L` but `f(a)` is undefined or not `L`, defining a new function with value `L` at `a` makes the function continuous there. This is a genuine extension because the local behavior already determines the only possible continuous value.

## Worked reasoning

`f(x)=(x²-1)/(x-1)` for `x≠1` has limit `2` at `1`. Defining `f(1)=2` repairs the hole. By contrast, the sign function has left limit `-1` and right limit `1` at zero, so no single value assigned at zero can make it continuous.

## Continuity as stability

Continuity is local input-output stability, not smoothness. A continuous function can have a corner, can oscillate rapidly, and need not be differentiable. It only promises that outputs near `f(a)` arise from sufficiently nearby inputs.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-cont-01",
  "type": "single-choice",
  "prompt": "Which three facts are required for continuity at a?",
  "options": [
    {
      "id": "a",
      "label": "Only f(a) exists."
    },
    {
      "id": "b",
      "label": "f(a) exists, lim f(x) exists as x→a, and the limit equals f(a)."
    },
    {
      "id": "c",
      "label": "The derivative exists."
    },
    {
      "id": "d",
      "label": "The graph has no corners anywhere."
    }
  ],
  "answer": "b",
  "explanation": "Use the formal continuity statement and the theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-cont-02",
  "type": "free-response",
  "prompt": "Why can a jump discontinuity not be repaired by redefining only f(a)?",
  "answer": "Because the two-sided limit does not exist: the left and right limits are different. Changing the value at the single center point cannot change surrounding one-sided behavior.",
  "explanation": "A complete response names the relevant limit and hypothesis."
}
```

```exercise
{
  "id": "ex-calc1-cont-01",
  "title": "Continuity classification",
  "difficulty": "Core",
  "brief": "Classify discontinuities and determine continuity domains for piecewise, rational and radical functions.",
  "estimatedMinutes": 45,
  "deliverables": [
    "12 classifications with justification",
    "two repaired removable-discontinuity definitions"
  ],
  "constraints": [
    "Check one-sided limits at piecewise boundaries"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Continuity packages a limit statement into a property of the function at a point. It is the gateway to powerful existence theorems: once continuity and compact interval hypotheses are present, surprisingly strong conclusions follow.
