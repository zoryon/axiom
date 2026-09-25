---

{
  "schemaVersion": 1,
  "id": "calc1.series",
  "title": "Infinite Series and Convergence",
  "subtitle": "Partial sums, geometric series, telescoping structure and necessary conditions",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Sequences and Series",
  "order": 260,
  "estimatedMinutes": 105,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.sequences"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Define an infinite series through its sequence of partial sums",
    "Recognize geometric and telescoping series",
    "Use the nth-term divergence test correctly",
    "Distinguish convergence of terms from convergence of a series"
  ],
  "status": "published"
}

---

# Infinite Series and Convergence

An infinite series is not an infinite arithmetic operation performed all at once. It is a limit of finite partial sums. This viewpoint keeps convergence precise and prevents the common mistake of treating infinitely many terms as if ordinary finite algebra always applied.

## Partial sums

For terms `a_n`, define `S_N=Σ_{n=1}^N a_n`. The series `Σ a_n` converges to `S` when the sequence `(S_N)` converges to `S`. Series theory is therefore sequence theory applied to accumulated sums.

## Geometric series

`Σ_{n=0}^∞ ar^n` converges to `a/(1-r)` when `|r|<1` and diverges when `|r|≥1` (except trivial zero coefficients). The finite geometric-sum formula makes the partial-sum limit explicit.

## Telescoping series

If terms decompose so successive pieces cancel, partial sums may simplify dramatically. Example: `1/[n(n+1)]=1/n-1/(n+1)`, so the sum from `n=1` to `N` is `1-1/(N+1)→1`.

## Necessary condition

If `Σa_n` converges, then `a_n→0` because `a_n=S_n-S_{n-1}` and both partial sums approach the same limit. The converse is false: harmonic terms `1/n→0`, yet `Σ1/n` diverges.

## Absolute and conditional convergence preview

A series converges absolutely if `Σ|a_n|` converges. Absolute convergence implies convergence. Some alternating series converge without absolute convergence; rearrangements then require caution. Detailed tests come next.

## Worked reasoning

For `Σ_{n=1}^∞ (1/3)^n`, `a=1/3` and `r=1/3`, so the sum is `(1/3)/(1-1/3)=1/2`. For `Σ 1/[n(n+1)]`, telescoping gives sum `1`. For `Σ n/(n+1)`, terms tend to `1`, so the series diverges immediately by the nth-term test.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-series-01",
  "type": "single-choice",
  "prompt": "If a_n→0, what can you conclude about Σa_n?",
  "options": [
    {
      "id": "a",
      "label": "It always converges."
    },
    {
      "id": "b",
      "label": "It converges absolutely."
    },
    {
      "id": "c",
      "label": "It converges if terms are positive."
    },
    {
      "id": "d",
      "label": "Nothing by itself; term convergence to 0 is necessary but not sufficient."
    }
  ],
  "answer": "d",
  "explanation": "Use the convergence definition and the stated test hypotheses."
}
```

```quiz
{
  "id": "q-calc1-series-02",
  "type": "free-response",
  "prompt": "Define convergence of an infinite series without using the phrase “add infinitely many terms”.",
  "answer": "Form the finite partial sums S_N=Σ_{n=1}^N a_n. The series converges if the sequence of partial sums converges to a finite limit.",
  "explanation": "A complete answer should identify the convergence mechanism, not only the final value."
}
```

```exercise
{
  "id": "ex-calc1-series-01",
  "title": "Partial-sum reasoning",
  "difficulty": "Core",
  "brief": "Analyze geometric, telescoping and nth-term-test examples by writing partial sums explicitly.",
  "estimatedMinutes": 60,
  "deliverables": [
    "12 series classifications",
    "four exact sums"
  ],
  "constraints": [
    "State the partial-sum sequence for every exact-sum problem"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Series are limits of accumulated finite data. That definition is simple, but it creates a rich theory because term decay alone does not determine whether total accumulation stabilizes.
