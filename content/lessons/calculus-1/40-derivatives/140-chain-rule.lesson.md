---

{
  "schemaVersion": 1,
  "id": "calc1.chain-rule",
  "title": "Chain Rule and Composite Functions",
  "subtitle": "How local rates multiply through layers of composition",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Differential Calculus",
  "order": 140,
  "estimatedMinutes": 95,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.rules"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Recognize composite-function structure",
    "Apply the chain rule across multiple nested layers",
    "Interpret the chain rule as multiplication of local rates",
    "Differentiate compositions of algebraic, exponential and trigonometric functions"
  ],
  "status": "published"
}

---

# Chain Rule and Composite Functions

Most real formulas are compositions. The chain rule says that local rates propagate through those layers multiplicatively: the outer function responds to the inner output, while the inner function determines how fast that output changes.

## Statement

If `g` is differentiable at `x` and `f` is differentiable at `g(x)`, then `(f∘g)'(x)=f'(g(x))g'(x)`. The outer derivative is evaluated at the inner value, then multiplied by the inner derivative.

## Local-linear explanation

For a small input change `dx`, the inner function changes by approximately `g'(x)dx`. The outer function responds by approximately `f'(g(x))` times that inner change. Multiplying the two factors gives the first-order response of the composition.

## Layer tracking

For `(1+3x²)^5`, outer operation is fifth power and inner is `1+3x²`; derivative is `5(1+3x²)^4·6x`. For `sin(e^{x²})`, the derivative follows three layers: cosine of the inner exponential, times the exponential, times `2x`.

## Avoiding missing factors

A common error is differentiating the outer form but forgetting the derivative of the inner function. Write temporary names such as `u=g(x)` when structure is visually dense, then substitute back. Repeated chain rule is often clearer as a product of one derivative per layer.

## Composition domains

Differentiability also requires the composition to be defined. A formula like `ln(1-x²)` has real domain `|x|<1`; its derivative `-2x/(1-x²)` is only a derivative of that real function on the original domain.

## Worked reasoning

Differentiate `h(x)=sqrt(1+x^4)`. Viewing `h(u)=sqrt(u)` and `u=1+x^4`, we get `h'(x)=4x³/(2sqrt(1+x^4))=2x³/sqrt(1+x^4)`. The denominator is nonzero because `1+x^4>0`.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-chain-01",
  "type": "single-choice",
  "prompt": "What is d/dx of sin(x²)?",
  "options": [
    {
      "id": "a",
      "label": "cos(x²)"
    },
    {
      "id": "b",
      "label": "2x cos(x²)"
    },
    {
      "id": "c",
      "label": "2x sin(x²)"
    },
    {
      "id": "d",
      "label": "cos(2x)"
    }
  ],
  "answer": "b",
  "explanation": "Check the definition and theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-chain-02",
  "type": "free-response",
  "prompt": "Explain the chain rule in words without using a formula.",
  "answer": "A small change in x first causes a change in the inner function; the outer function then responds to that changed inner value. The total local rate is the outer local rate times the inner local rate.",
  "explanation": "A complete answer should identify the relevant limit or derivative rule."
}
```

```exercise
{
  "id": "ex-calc1-chain-01",
  "title": "Nested derivative tracing",
  "difficulty": "Core",
  "brief": "Differentiate 16 compositions of increasing depth and annotate each outer-to-inner layer.",
  "estimatedMinutes": 55,
  "deliverables": [
    "16 derivatives",
    "layer decomposition for six selected problems"
  ],
  "constraints": [
    "Preserve original domains",
    "Show every chain factor"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

The chain rule is one of the central compositional laws of calculus. It scales from elementary formulas to automatic differentiation, neural networks and sensitivity analysis because composition is how complex systems are built.
