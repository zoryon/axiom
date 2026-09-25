---

{
  "schemaVersion": 1,
  "id": "calc1.improper-integrals",
  "title": "Improper Integrals",
  "subtitle": "Extending integration to infinite intervals and unbounded integrands through limits",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Integral Calculus",
  "order": 240,
  "estimatedMinutes": 95,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.integration-techniques"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Define improper integrals using limits",
    "Determine convergence of standard p-type improper integrals",
    "Split integrals at interior singularities",
    "Distinguish finite-area convergence from unbounded domain/integrand behavior"
  ],
  "status": "published"
}

---

# Improper Integrals

A Riemann integral is initially defined on finite intervals for bounded functions. Improper integrals extend the idea by replacing an infinite endpoint or singularity with a limit. The integral exists only if the defining limit converges.

## Infinite intervals

Define `∫_a^∞ f(x)dx = lim_{b→∞}∫_a^b f(x)dx`, when the limit exists finitely. Similarly handle `(-∞,b]`; an integral over the entire real line must be split at a finite point, with both tails converging separately.

## Unbounded integrands

If `f` becomes unbounded near an endpoint `a`, define `∫_a^b f` using `lim_{t→a^+}∫_t^b f`. If there is an interior singularity `c`, split at `c` and require both one-sided improper integrals to converge. Cancellation across the singularity is not enough under this definition.

## p-integrals

For `p>0`, `∫_1^∞ x^{-p}dx` converges exactly when `p>1`. Near zero, `∫_0^1 x^{-p}dx` converges exactly when `p<1`. These threshold examples become templates for comparison tests later.

## Convergence versus formal antiderivatives

An antiderivative expression can exist for every truncated interval while the limiting endpoint value diverges. Always write the limit explicitly. Writing `∫_1^∞ 1/x dx=[ln x]_1^∞=∞` is shorthand; the rigorous statement is that `lim_{b→∞}ln b` diverges, so the improper integral does not converge.

## Comparison intuition

If `0≤f≤g` eventually and `∫g` converges, then `∫f` converges. If `f≥g≥0` and `∫g` diverges, then `∫f` diverges. This mirrors series comparison and makes asymptotic behavior decisive.

## Worked reasoning

`∫_1^∞ 1/x² dx = lim_{b→∞}[-1/x]_1^b=1`, so an infinite interval can have finite total accumulation. By contrast `∫_1^∞1/x dx` diverges. Near zero, `∫_0^1 1/sqrt(x) dx=2` converges despite the integrand becoming unbounded.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-improper-01",
  "type": "single-choice",
  "prompt": "When does ∫_1^∞ x^{-p} dx converge?",
  "options": [
    {
      "id": "a",
      "label": "For every p>0"
    },
    {
      "id": "b",
      "label": "Only p<1"
    },
    {
      "id": "c",
      "label": "Only p=1"
    },
    {
      "id": "d",
      "label": "Exactly p>1"
    }
  ],
  "answer": "d",
  "explanation": "Use the definition or theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-improper-02",
  "type": "free-response",
  "prompt": "Why must an integral with an interior singularity be split into two one-sided improper integrals?",
  "answer": "Because each side must have a finite accumulated value independently. Opposite divergences are not allowed to cancel under the standard improper-integral definition.",
  "explanation": "A complete answer should connect accumulation, area and antiderivatives precisely."
}
```

```exercise
{
  "id": "ex-calc1-improper-01",
  "title": "Improper-integral convergence",
  "difficulty": "University",
  "brief": "Evaluate or classify 12 improper integrals involving infinite intervals and endpoint/interior singularities.",
  "estimatedMinutes": 60,
  "deliverables": [
    "12 limit-based analyses",
    "classification of each as convergent/divergent"
  ],
  "constraints": [
    "Write the defining limit before evaluation",
    "Split every interior singularity"
  ],
  "language": "math"
}
```

```task
{
  "id": "task-calc1-integration-summary",
  "title": "Integration concept map",
  "detail": "Create a map linking Riemann sums, definite integrals, accumulation functions, FTC, antiderivatives, substitution, integration by parts and improper limits.",
  "estimatedMinutes": 25
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Improper integration reinforces a recurring analysis principle: extend a finite concept by a limit, then require the limit to exist. The symbol may look like an ordinary integral, but convergence is a theorem to establish, not an assumption.
