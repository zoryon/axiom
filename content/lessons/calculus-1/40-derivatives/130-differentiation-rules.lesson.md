---

{
  "schemaVersion": 1,
  "id": "calc1.rules",
  "title": "Differentiation Rules",
  "subtitle": "Linearity, products, quotients, powers and elementary-function derivatives",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Differential Calculus",
  "order": 130,
  "estimatedMinutes": 100,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.derivative-definition"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Apply linearity, product, quotient and power rules",
    "Differentiate polynomial, rational, exponential and trigonometric combinations",
    "Explain where the product rule comes from conceptually",
    "Avoid algebraic and domain errors in symbolic differentiation"
  ],
  "status": "published"
}

---

# Differentiation Rules

Differentiation rules compress repeated limit arguments into reusable theorems. The goal is not memorizing a table; it is learning how local linear changes combine when functions are added, multiplied or divided.

## Linearity

`(af+bg)'=af'+bg'`. Constants scale derivatives and sums differentiate term by term. This follows directly by splitting the difference quotient and using limit laws.

## Product rule

`(fg)'=f'g+fg'`. A product changes because each factor changes. The missing cross-term in a naive `f'g'` guess is exposed by writing `f(x+h)g(x+h)-f(x)g(x)` and adding/subtracting a mixed term.

## Quotient rule

Where `g≠0`, `(f/g)'=(f'g-fg')/g²`. Domain restrictions remain essential: a derivative formula cannot restore points where the original quotient was undefined.

## Power and elementary derivatives

For integer powers, `(x^n)'=nx^{n-1}`. Standard derivatives include `(e^x)'=e^x`, `(sin x)'=cos x`, `(cos x)'=-sin x`; logarithmic and general real-power formulas depend on domain. These are theorem-backed facts whose proofs use limits and properties of the elementary functions.

## Order of operations

Simplify when it reduces risk, but do not simplify in ways that obscure the domain. Differentiate structure from the outside algebraic operations inward. Parentheses and factorization often make product/quotient structure clearer.

## Worked reasoning

For `f(x)=x² e^x`, product rule gives `f'=2xe^x+x²e^x=e^x(x²+2x)`. For `g(x)=(x²+1)/x`, quotient rule works, but simplifying to `x+1/x` first may be clearer on the same domain `x≠0`, yielding `1-1/x²`.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-rules-01",
  "type": "single-choice",
  "prompt": "What is the derivative of f(x)g(x)?",
  "options": [
    {
      "id": "a",
      "label": "f'g'"
    },
    {
      "id": "b",
      "label": "fg'"
    },
    {
      "id": "c",
      "label": "f'g+fg'"
    },
    {
      "id": "d",
      "label": "f'/g'"
    }
  ],
  "answer": "c",
  "explanation": "Check the definition and theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-rules-02",
  "type": "free-response",
  "prompt": "Why is (fg)' not generally f'g'?",
  "answer": "Both factors contribute first-order changes. Expanding the increment of a product produces one term from changing f and one from changing g; the product of both tiny changes is second order and vanishes in the limit.",
  "explanation": "A complete answer should identify the relevant limit or derivative rule."
}
```

```exercise
{
  "id": "ex-calc1-rules-01",
  "title": "Differentiation fluency",
  "difficulty": "Core",
  "brief": "Differentiate 18 expressions involving sums, products, quotients, powers, exponentials and basic trigonometric functions.",
  "estimatedMinutes": 60,
  "deliverables": [
    "18 derivatives",
    "domain note for each rational/logarithmic expression"
  ],
  "constraints": [
    "Simplify enough to make structure clear",
    "Check at least three answers numerically with a finite-difference estimate"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Rules should increase reliability, not merely speed. The best symbolic differentiator still tracks domains, units and structure while applying the theorems mechanically.
