---

{
  "schemaVersion": 1,
  "id": "calc1.derivative-definition",
  "title": "Derivative as a Limit",
  "subtitle": "Instantaneous rate of change, tangent slope and differentiability from first principles",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Differential Calculus",
  "order": 120,
  "estimatedMinutes": 100,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.compactness-one-variable"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Define the derivative using a difference quotient",
    "Interpret derivative as local linear rate of change",
    "Compute simple derivatives from first principles",
    "Explain why differentiability implies continuity but not conversely"
  ],
  "status": "published"
}

---

# Derivative as a Limit

The derivative answers a local question: if the input changes by a tiny amount, what first-order change should we expect in the output? Its definition is a limit of average rates, not a symbolic rule.

## Difference quotient

For `h≠0`, `[f(a+h)-f(a)]/h` is the average rate of change across an interval of width `h`. If its limit exists as `h→0`, that limit is `f'(a)`. An equivalent form uses `[f(x)-f(a)]/(x-a)` as `x→a`.

## Geometric meaning

Secant lines through `(a,f(a))` and nearby points have slopes given by the difference quotient. When those slopes converge, the limiting slope defines the tangent line `y=f(a)+f'(a)(x-a)`.

## Local linearity

Differentiability means more than possessing a tangent slope: near `a`, `f(a+h)=f(a)+f'(a)h+r(h)` where `r(h)/h→0`. The linear term gives the first-order behavior and the remainder is small relative to `h`.

## First-principles examples

For `f(x)=x²`, `[f(a+h)-f(a)]/h=[2ah+h²]/h=2a+h→2a`. Thus the derivative is `2x`. For `f(x)=|x|` at `0`, the right difference quotient tends to `1` while the left tends to `-1`; no derivative exists.

## Differentiability implies continuity

If `f'(a)` exists, then `f(a+h)-f(a)=h·([f(a+h)-f(a)]/h)→0`, so `f(a+h)→f(a)`. The converse is false: `|x|` is continuous at zero but not differentiable there.

## Units and interpretation

If `s(t)` is position measured in meters and time is seconds, `s'(t)` has units meters per second. Derivatives carry semantic units and should be interpreted in context, not treated as unitless algebra.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-derivdef-01",
  "type": "single-choice",
  "prompt": "What does f'(a) represent geometrically?",
  "options": [
    {
      "id": "a",
      "label": "The y-intercept of f."
    },
    {
      "id": "b",
      "label": "The limiting slope of secant lines, when the limit exists."
    },
    {
      "id": "c",
      "label": "The area under f."
    },
    {
      "id": "d",
      "label": "The maximum value of f."
    }
  ],
  "answer": "b",
  "explanation": "Check the definition and theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-derivdef-02",
  "type": "free-response",
  "prompt": "Why does differentiability imply continuity?",
  "answer": "If the difference quotient tends to a finite derivative, then f(a+h)-f(a)=h times that quotient tends to 0 as h→0, hence f(a+h)→f(a).",
  "explanation": "A complete answer should identify the relevant limit or derivative rule."
}
```

```exercise
{
  "id": "ex-calc1-derivdef-01",
  "title": "Derivatives from first principles",
  "difficulty": "Core",
  "brief": "Use the limit definition to differentiate constants, linear functions, x², 1/x at a nonzero point, and one piecewise function.",
  "estimatedMinutes": 55,
  "deliverables": [
    "five first-principles derivations",
    "one tangent-line equation"
  ],
  "constraints": [
    "Do not use memorized differentiation rules",
    "Show difference-quotient simplification"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Every later differentiation rule is a theorem derived from this limit. Keeping the first-principles meaning in view prevents symbolic differentiation from becoming disconnected from local behavior.
