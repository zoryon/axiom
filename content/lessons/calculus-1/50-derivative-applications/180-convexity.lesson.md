---

{
  "schemaVersion": 1,
  "id": "calc1.convexity",
  "title": "Convexity, Concavity and Inflection",
  "subtitle": "Second-order shape, curvature and how slopes themselves change",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Applications of Derivatives",
  "order": 180,
  "estimatedMinutes": 90,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.monotonicity-extrema"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Interpret the second derivative as change of slope",
    "Determine intervals of convexity/concavity from f''",
    "Identify genuine inflection points",
    "Use first and second derivative information together in curve analysis"
  ],
  "status": "published"
}

---

# Convexity, Concavity and Inflection

The first derivative describes whether a function rises or falls. The second derivative describes how that slope changes. This second-order information controls curvature, local approximation quality and many optimization criteria.

## Second derivative

When `f'` is differentiable, `f''` measures how the slope changes with input. If `f''>0` on an interval, slopes increase and the graph is convex (often called concave up). If `f''<0`, slopes decrease and the graph is concave down.

## Inflection points

An inflection point is a point where concavity changes. A zero or undefined second derivative is only a candidate. For `x^4`, `f''(0)=0` but the second derivative is nonnegative on both sides, so zero is not an inflection point. For `x³`, the sign changes and zero is an inflection point.

## Second-derivative test

At a critical point `c` with `f'(c)=0`, if `f''(c)>0`, the function has a strict local minimum; if `f''(c)<0`, a strict local maximum. If `f''(c)=0`, the test is inconclusive and first-derivative analysis or higher-order information is required.

## Geometric inequalities

For differentiable convex functions, tangent lines lie below the graph; secant slopes increase as intervals move right. These properties provide useful inequalities and later generalize to convex optimization, where local minima can become global minima under convexity.

## Worked reasoning

For `f(x)=x^4-4x²`, `f'=4x(x²-2)` and `f''=12x²-8`. Concavity changes where `12x²-8=0`, namely `x=±sqrt(2/3)`. Those are inflection candidates and the sign chart confirms changes.

## Combined curve analysis

A complete qualitative sketch uses domain, intercepts, asymptotes, first-derivative sign, extrema, second-derivative sign and inflection points. The goal is not artistic precision but a logically justified description of shape.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-convex-01",
  "type": "single-choice",
  "prompt": "If f''(x)>0 throughout an interval, what is true?",
  "options": [
    {
      "id": "a",
      "label": "f is decreasing."
    },
    {
      "id": "b",
      "label": "f is convex/concave up there and its slopes are increasing."
    },
    {
      "id": "c",
      "label": "Every point is a minimum."
    },
    {
      "id": "d",
      "label": "f is linear."
    }
  ],
  "answer": "b",
  "explanation": "Use derivative sign information and theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-convex-02",
  "type": "free-response",
  "prompt": "Why is f''(c)=0 not enough to prove an inflection point?",
  "answer": "An inflection point requires a change of concavity across c. The second derivative can be zero without changing sign, as with x^4 at 0.",
  "explanation": "A complete answer should connect the derivative information to the global conclusion."
}
```

```exercise
{
  "id": "ex-calc1-convex-01",
  "title": "Second-order curve analysis",
  "difficulty": "Core",
  "brief": "Determine concavity, inflection points and second-derivative classifications for eight functions.",
  "estimatedMinutes": 50,
  "deliverables": [
    "eight second-derivative sign charts",
    "four justified curve sketches"
  ],
  "constraints": [
    "Verify sign changes before declaring inflection points"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Second-order analysis asks not just where a function is going, but how its rate is changing. That extra layer supports approximation, stability analysis and convex optimization.
