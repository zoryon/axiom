---

{
  "schemaVersion": 1,
  "id": "calc1.convergence-tests",
  "title": "Comparison, Ratio and Root Tests",
  "subtitle": "Choosing convergence tests from asymptotic structure rather than guessing",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Sequences and Series",
  "order": 270,
  "estimatedMinutes": 105,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.series"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Use direct and limit comparison tests for positive-term series",
    "Apply ratio and root tests",
    "Recognize p-series and geometric benchmarks",
    "Choose tests based on asymptotic structure"
  ],
  "status": "published"
}

---

# Comparison, Ratio and Root Tests

Convergence tests are comparison tools. The goal is not to try every named test; it is to identify what the terms behave like and choose a theorem whose hypotheses match that structure.

## p-series and benchmarks

`Σ1/n^p` converges for `p>1` and diverges for `p≤1`. Together with geometric series, p-series form the main benchmarks for comparison. Their thresholds mirror corresponding improper integrals.

## Direct comparison

For nonnegative terms, if `0≤a_n≤b_n` eventually and `Σb_n` converges, then `Σa_n` converges. If `a_n≥b_n≥0` eventually and `Σb_n` diverges, then `Σa_n` diverges. Inequality direction must support the desired conclusion.

## Limit comparison

If positive sequences satisfy `a_n/b_n→c` with `0<c<∞`, then `Σa_n` and `Σb_n` have the same convergence behavior. This formalizes “same leading-order size”.

## Ratio test

If `L=lim |a_{n+1}/a_n|`, then `L<1` gives absolute convergence and `L>1` (or infinite) gives divergence. `L=1` is inconclusive. Factorials and exponentials often make the ratio test natural.

## Root test

If `L=limsup |a_n|^{1/n}`, then `L<1` gives absolute convergence and `L>1` divergence. It is especially effective when the nth term is a whole expression raised to the nth power.

## Strategy examples

For `Σ(3n+1)/(n³+2)`, compare with `1/n²`. For `Σ n!/4^n`, the ratio test simplifies factorial growth. For `Σ((2n+1)/(3n))^n`, the root test exposes a limiting base near `2/3`.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-tests-01",
  "type": "single-choice",
  "prompt": "What does the ratio test conclude when L=1?",
  "options": [
    {
      "id": "a",
      "label": "Convergence."
    },
    {
      "id": "b",
      "label": "Divergence."
    },
    {
      "id": "c",
      "label": "Nothing; the test is inconclusive."
    },
    {
      "id": "d",
      "label": "Absolute convergence only if terms are positive."
    }
  ],
  "answer": "c",
  "explanation": "Use the convergence definition and the stated test hypotheses."
}
```

```quiz
{
  "id": "q-calc1-tests-02",
  "type": "free-response",
  "prompt": "When is limit comparison especially natural?",
  "answer": "When positive terms have the same leading asymptotic form as a known benchmark, so their ratio tends to a finite positive constant.",
  "explanation": "A complete answer should identify the convergence mechanism, not only the final value."
}
```

```exercise
{
  "id": "ex-calc1-tests-01",
  "title": "Convergence-test selection",
  "difficulty": "University",
  "brief": "Classify 18 positive or absolute-value series and justify why the chosen convergence test is structurally appropriate.",
  "estimatedMinutes": 75,
  "deliverables": [
    "18 classifications",
    "one-sentence test-selection rationale for each"
  ],
  "constraints": [
    "Do not cite a test without verifying its hypotheses",
    "Mark inconclusive tests explicitly"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Strong series work is diagnostic: inspect the terms, identify dominant behavior, and select a theorem that compares that behavior to a known convergent or divergent model.
