---

{
  "schemaVersion": 1,
  "id": "calc1.monotonicity-extrema",
  "title": "Monotonicity, Extrema and Critical Points",
  "subtitle": "Using first derivatives to classify behavior and locate local/global extrema",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Applications of Derivatives",
  "order": 170,
  "estimatedMinutes": 95,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.mean-value"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Identify critical points correctly",
    "Use first-derivative sign charts to determine monotonicity",
    "Classify local extrema",
    "Find absolute extrema on closed intervals"
  ],
  "status": "published"
}

---

# Monotonicity, Extrema and Critical Points

The derivative turns the qualitative shape of a function into sign information. Positive derivative means local increase, negative derivative means local decrease, and changes of sign reveal local extrema. The key is to distinguish candidates from conclusions.

## Critical points

A critical number is a domain point where `f'(c)=0` or where `f'(c)` does not exist. Critical points are candidates for local extrema, not automatic extrema. Endpoints are also candidates for absolute extrema on closed intervals even though they are not interior critical numbers.

## First-derivative test

Partition the domain at critical numbers and discontinuities. Determine the sign of `f'` on each interval. A change from positive to negative at `c` indicates a local maximum; negative to positive indicates a local minimum; no sign change means no local extremum from this test.

## Absolute extrema on closed intervals

For continuous `f` on `[a,b]`, EVT guarantees absolute extrema exist. The closed-interval method is: find interior critical points, evaluate `f` there and at endpoints, then compare values. This procedure combines existence theory with derivative-based candidate generation.

## Stationary does not mean extreme

`f(x)=x³` has `f'(0)=0` but is increasing through zero, so there is no local extremum. `f(x)=|x|` has a local minimum at zero even though the derivative fails there. This is why the critical-point definition includes nondifferentiability.

## Worked reasoning

For `f(x)=x³-3x`, `f'=3(x²-1)`, so critical points are `±1`. The derivative is positive on `(-∞,-1)`, negative on `(-1,1)`, and positive on `(1,∞)`. Thus `x=-1` is a local maximum and `x=1` a local minimum.

## A disciplined workflow

State the domain, compute the derivative, solve for critical numbers, include nondifferentiable domain points, build a sign chart, and only then state monotonicity/extrema. For absolute extrema on a closed interval, compare actual function values.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-extrema-01",
  "type": "single-choice",
  "prompt": "Which is always a candidate for an absolute extremum of a continuous function on [a,b]?",
  "options": [
    {
      "id": "a",
      "label": "Only points where f'=0."
    },
    {
      "id": "b",
      "label": "Only nondifferentiable points."
    },
    {
      "id": "c",
      "label": "Endpoints and interior critical points."
    },
    {
      "id": "d",
      "label": "Every point in the interval."
    }
  ],
  "answer": "c",
  "explanation": "Use derivative sign information and theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-extrema-02",
  "type": "free-response",
  "prompt": "Why does f'(c)=0 not prove c is a local extremum?",
  "answer": "A horizontal tangent can occur without a change from increasing to decreasing or vice versa; for example x³ has derivative 0 at 0 but remains increasing through the point.",
  "explanation": "A complete answer should connect the derivative information to the global conclusion."
}
```

```exercise
{
  "id": "ex-calc1-extrema-01",
  "title": "Derivative sign-chart analysis",
  "difficulty": "Core",
  "brief": "Analyze monotonicity and extrema for eight functions, including polynomial, rational and absolute-value cases.",
  "estimatedMinutes": 55,
  "deliverables": [
    "eight sign charts",
    "local-extremum classifications",
    "absolute extrema for two closed-interval problems"
  ],
  "constraints": [
    "State the domain first",
    "Do not classify from f'=0 alone"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Critical points narrow the search; derivative signs deliver the interpretation. This separation between candidate generation and verification is a useful pattern far beyond calculus.
