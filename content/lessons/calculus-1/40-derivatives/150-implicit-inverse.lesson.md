---

{
  "schemaVersion": 1,
  "id": "calc1.implicit-inverse",
  "title": "Implicit Differentiation and Inverse Functions",
  "subtitle": "Differentiating relations and deriving inverse-function rates",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Differential Calculus",
  "order": 150,
  "estimatedMinutes": 100,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.chain-rule"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Differentiate equations that define y implicitly as a function of x",
    "Solve for dy/dx after applying chain rule to y-dependent terms",
    "Derive and apply the inverse-function derivative formula",
    "Identify points where implicit or inverse derivatives fail"
  ],
  "status": "published"
}

---

# Implicit Differentiation and Inverse Functions

Not every curve is naturally presented as `y=f(x)`. Implicit differentiation lets us differentiate a relation directly, while the inverse-function rule explains how slopes transform when inputs and outputs exchange roles.

## Implicit relations

Suppose `F(x,y)=0` and locally `y` depends on `x`. Differentiate both sides with respect to `x`, treating `y=y(x)`. Every derivative of a `y` term picks up `dy/dx` by the chain rule.

## Circle example

From `x²+y²=25`, differentiation gives `2x+2y y'=0`, so `y'=-x/y` where `y≠0`. At points with `y=0`, the curve has vertical tangents and cannot locally be represented as a differentiable function `y(x)` with finite slope.

## Inverse derivative

If `f` is differentiable and locally invertible with `f'(x)≠0`, then `(f^{-1})'(f(x))=1/f'(x)`. Equivalently, `(f^{-1})'(y)=1/f'(f^{-1}(y))`. This follows by differentiating `f(f^{-1}(y))=y` and using the chain rule.

## Inverse trigonometric/logarithmic examples

Derivative formulas for inverse trigonometric functions can be derived from identities rather than memorized. If `y=arcsin x`, then `sin y=x`; differentiating gives `cos y·y'=1`, and using `cos y=sqrt(1-x²)` on the principal range yields `y'=1/sqrt(1-x²)` for `|x|<1`.

## Local invertibility

A globally non-injective function may still be locally invertible where its derivative is nonzero. Conversely, zero derivative warns that the simple reciprocal-slope formula cannot be used. The higher-dimensional inverse-function theorem generalizes this idea using Jacobian matrices.

## Worked reasoning

For `x³+y³=6xy`, differentiate: `3x²+3y²y'=6y+6xy'`. Collect derivative terms: `(3y²-6x)y'=6y-3x²`, hence `y'=(2y-x²)/(y²-2x)` where the denominator is nonzero.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-implicit-01",
  "type": "single-choice",
  "prompt": "When differentiating y² with respect to x, what do you get?",
  "options": [
    {
      "id": "a",
      "label": "2y"
    },
    {
      "id": "b",
      "label": "2x"
    },
    {
      "id": "c",
      "label": "2y·dy/dx"
    },
    {
      "id": "d",
      "label": "dy/dx only"
    }
  ],
  "answer": "c",
  "explanation": "Check the definition and theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-implicit-02",
  "type": "free-response",
  "prompt": "State the derivative formula for an inverse function and its key nonzero-slope hypothesis.",
  "answer": "If f is locally invertible and differentiable with f'(x)≠0, then (f^{-1})'(f(x))=1/f'(x), or equivalently (f^{-1})'(y)=1/f'(f^{-1}(y)).",
  "explanation": "A complete answer should identify the relevant limit or derivative rule."
}
```

```exercise
{
  "id": "ex-calc1-implicit-01",
  "title": "Implicit and inverse differentiation",
  "difficulty": "Core",
  "brief": "Differentiate eight implicit curves and derive three inverse-function derivatives from identities.",
  "estimatedMinutes": 60,
  "deliverables": [
    "11 worked derivations",
    "identification of points with vertical tangents or invalid reciprocal slopes"
  ],
  "constraints": [
    "Show chain-rule factors on y terms",
    "State domain/range branches for inverse functions"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Implicit and inverse differentiation reveal that derivatives belong to local relationships, not only explicit formulas. The reciprocal-slope idea becomes especially important later in coordinate transformations and multivariable analysis.
