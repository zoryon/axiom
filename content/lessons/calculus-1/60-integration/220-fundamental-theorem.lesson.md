---

{
  "schemaVersion": 1,
  "id": "calc1.fundamental-theorem",
  "title": "Fundamental Theorem of Calculus",
  "subtitle": "The deep equivalence between local rates of change and global accumulation",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Integral Calculus",
  "order": 220,
  "estimatedMinutes": 105,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.riemann"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "State both parts of the Fundamental Theorem of Calculus",
    "Differentiate accumulation functions",
    "Evaluate definite integrals using antiderivatives",
    "Explain conceptually why differentiation and integration are inverse processes"
  ],
  "status": "published"
}

---

# Fundamental Theorem of Calculus

The Fundamental Theorem of Calculus connects two ideas developed separately: derivative as local rate and integral as accumulated total. Under appropriate hypotheses, accumulating a rate and differentiating the accumulated total undo one another.

## FTC Part I

If `f` is continuous and `F(x)=∫_a^x f(t)dt`, then `F'(x)=f(x)`. Increasing the upper limit by a small `h` adds approximately a thin strip of area `f(x)h`, so the average change in `F` approaches `f(x)`.

## FTC Part II

If `F` is any antiderivative of continuous `f` on `[a,b]`, then `∫_a^b f(x)dx=F(b)-F(a)`. This converts a limiting accumulation problem into endpoint evaluation of an antiderivative.

## Why antiderivatives differ by constants

If `F'=G'=f`, then `(F-G)'=0`; by the Mean Value Theorem, `F-G` is constant on the interval. Thus endpoint differences are independent of which antiderivative you choose.

## Variable limits

For `H(x)=∫_a^{g(x)} f(t)dt`, chain rule plus FTC gives `H'(x)=f(g(x))g'(x)`. If both limits vary, rewrite using a fixed reference point and differentiate each term.

## Net change theorem

If `q'(t)` is a rate, then `q(b)-q(a)=∫_a^b q'(t)dt`. This is the physically meaningful form: accumulated rate equals total change. Distance, charge, mass, energy and probability models all exploit this principle.

## Worked reasoning

For `F(x)=∫_1^{x²} cos(t²)dt`, no elementary antiderivative for `cos(t²)` is needed to differentiate: `F'(x)=cos(x^4)·2x`. The theorem defines differentiable accumulation functions even when symbolic integration is impossible.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-ftc-01",
  "type": "single-choice",
  "prompt": "If F(x)=∫_a^x f(t)dt and f is continuous, what is F'(x)?",
  "options": [
    {
      "id": "a",
      "label": "0"
    },
    {
      "id": "b",
      "label": "F(x)"
    },
    {
      "id": "c",
      "label": "f(x)"
    },
    {
      "id": "d",
      "label": "f(a)"
    }
  ],
  "answer": "c",
  "explanation": "Use the definition or theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-ftc-02",
  "type": "free-response",
  "prompt": "Explain the net-change interpretation of FTC.",
  "answer": "Integrating a rate over an interval adds all infinitesimal changes, producing the difference between the final and initial amount: q(b)-q(a)=∫_a^b q'(t)dt.",
  "explanation": "A complete answer should connect accumulation, area and antiderivatives precisely."
}
```

```exercise
{
  "id": "ex-calc1-ftc-01",
  "title": "FTC and accumulation functions",
  "difficulty": "Core",
  "brief": "Differentiate variable-limit integrals and evaluate definite integrals using antiderivatives.",
  "estimatedMinutes": 60,
  "deliverables": [
    "14 worked problems",
    "two short interpretations in physical units"
  ],
  "constraints": [
    "Use chain rule explicitly for composed limits"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

FTC is the conceptual center of first-year calculus: local change and global accumulation are two views of the same structure. Symbolic integration is useful because this theorem makes antiderivatives computationally powerful.
