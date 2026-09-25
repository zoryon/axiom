---

{
  "schemaVersion": 1,
  "id": "calc1.integration-techniques",
  "title": "Substitution and Integration by Parts",
  "subtitle": "Reverse chain rule, reverse product rule and strategy for antiderivative construction",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Integral Calculus",
  "order": 230,
  "estimatedMinutes": 100,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.fundamental-theorem"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Recognize substitution as a reverse chain-rule pattern",
    "Apply definite-integral substitution with correct bounds",
    "Derive and use integration by parts",
    "Choose techniques based on expression structure"
  ],
  "status": "published"
}

---

# Substitution and Integration by Parts

Integration techniques are not a bag of unrelated tricks. Substitution reverses the chain rule; integration by parts reverses the product rule. The central skill is structural recognition.

## Substitution

If an integrand has the form `f(g(x))g'(x)`, let `u=g(x)`. Then `du=g'(x)dx`, reducing the integral to `∫f(u)du`. For definite integrals, either change the bounds into `u`-values or substitute back before evaluating—do not mix both conventions.

## Why substitution works

From the chain rule, if `F'=f`, then `d/dx F(g(x))=f(g(x))g'(x)`. Therefore `F(g(x))` is an antiderivative of the composite integrand. Differential notation is bookkeeping for this theorem, not independent algebra with infinitesimals.

## Integration by parts

The product rule `(uv)'=u'v+uv'` rearranges to `∫u dv=uv-∫v du`. Choose `u` so differentiation simplifies it and `dv` so it can be integrated. Logarithms, inverse trigonometric functions and polynomial-times-exponential/trigonometric products are common candidates.

## Strategy

Before choosing a technique, simplify algebraically. Look for an inner function with its derivative for substitution; look for a product where differentiating one factor helps for parts. Repeated integration by parts may be needed, but avoid blindly applying formulas to expressions whose simpler algebraic form is obvious.

## Definite integrals

For substitution in `∫_a^b`, transformed bounds `u=g(a),g(b)` preserve orientation automatically. Integration by parts has endpoint term `[uv]_a^b`. Domain and continuity still matter: formal antiderivatives do not override undefined points inside the interval.

## Worked reasoning

`∫ 2x cos(x²)dx`: set `u=x²`, obtaining `∫cos u du=sin u+C=sin(x²)+C`. For `∫ x e^x dx`, choose `u=x`, `dv=e^x dx`; then `du=dx`, `v=e^x`, giving `xe^x-e^x+C`.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-tech-01",
  "type": "single-choice",
  "prompt": "Which differentiation rule is reversed by integration by parts?",
  "options": [
    {
      "id": "a",
      "label": "Chain rule"
    },
    {
      "id": "b",
      "label": "Product rule"
    },
    {
      "id": "c",
      "label": "Quotient rule"
    },
    {
      "id": "d",
      "label": "Mean Value Theorem"
    }
  ],
  "answer": "b",
  "explanation": "Use the definition or theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-tech-02",
  "type": "free-response",
  "prompt": "Why is u-substitution not merely symbolic replacement?",
  "answer": "It is justified by the chain rule: an antiderivative F of f gives F(g(x)) as an antiderivative of f(g(x))g'(x). The notation du=g'(x)dx records that structural change.",
  "explanation": "A complete answer should connect accumulation, area and antiderivatives precisely."
}
```

```exercise
{
  "id": "ex-calc1-tech-01",
  "title": "Integration technique selection",
  "difficulty": "Core",
  "brief": "Evaluate 16 indefinite/definite integrals requiring algebraic simplification, substitution or integration by parts.",
  "estimatedMinutes": 70,
  "deliverables": [
    "16 integrals with method justification"
  ],
  "constraints": [
    "For definite substitution, transform bounds consistently",
    "Differentiate final antiderivatives as a check when practical"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Technique selection is pattern recognition grounded in differentiation theorems. Always ask which derivative rule could have produced the integrand you see.
