---

{
  "schemaVersion": 1,
  "id": "calc1.sequences",
  "title": "Sequences, Limits and Monotonicity",
  "subtitle": "Discrete convergence, bounded monotone sequences and recursive examples",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Sequences and Series",
  "order": 250,
  "estimatedMinutes": 100,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.improper-integrals"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Define convergence of a real sequence using epsilon-N language",
    "Compute elementary sequence limits",
    "Use monotone bounded convergence",
    "Analyze simple recursive sequences"
  ],
  "status": "published"
}

---

# Sequences, Limits and Monotonicity

A sequence is a function whose domain is the positive integers. Its limit asks whether terms eventually remain arbitrarily close to a number. This discrete version of limiting behavior is the foundation for infinite series, numerical iteration and approximation schemes.

## Definition

A sequence `(a_n)` converges to `L` if for every `ε>0` there exists `N` such that `n≥N` implies `|a_n-L|<ε`. The phrase “eventually” is essential: finitely many early terms have no effect on convergence.

## Limit laws

Convergent sequences obey sum, product and quotient laws analogous to function limits. If `a_n→L`, then every subsequence also tends to `L`. Therefore finding two subsequences with different limits proves the original sequence diverges.

## Monotone bounded convergence

Every increasing sequence bounded above converges; every decreasing sequence bounded below converges. Completeness of `ℝ` is the hidden engine: the limit is the supremum or infimum of the set of terms.

## Common examples

`1/n→0`; `r^n→0` for `|r|<1`; `(-1)^n` diverges because even and odd subsequences differ. Rational expressions in `n` can often be analyzed by dividing through by the dominant power.

## Recursive sequences

For a recurrence `a_{n+1}=φ(a_n)`, a candidate limit `L` must satisfy `L=φ(L)` if continuity permits passing to the limit. But solving the fixed-point equation does not prove convergence; boundedness and monotonicity or a contraction argument are needed.

## Worked reasoning

Let `a_1=1` and `a_{n+1}=sqrt(2+a_n)`. One can show inductively that `a_n<2` and that the sequence increases. Therefore it converges. Passing to the limit gives `L=sqrt(2+L)`, so `L²-L-2=0`; positivity yields `L=2`.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-seq-01",
  "type": "single-choice",
  "prompt": "Which statement is true of a convergent sequence?",
  "options": [
    {
      "id": "a",
      "label": "It must be eventually constant."
    },
    {
      "id": "b",
      "label": "It must be monotone."
    },
    {
      "id": "c",
      "label": "Every subsequence converges to the same limit."
    },
    {
      "id": "d",
      "label": "It must have finitely many terms."
    }
  ],
  "answer": "c",
  "explanation": "Use the convergence definition and the stated test hypotheses."
}
```

```quiz
{
  "id": "q-calc1-seq-02",
  "type": "free-response",
  "prompt": "Why does monotone + bounded imply convergence in ℝ?",
  "answer": "An increasing bounded sequence has a supremum in ℝ by completeness; terms can be shown to approach that supremum. The decreasing case is analogous using an infimum.",
  "explanation": "A complete answer should identify the convergence mechanism, not only the final value."
}
```

```exercise
{
  "id": "ex-calc1-seq-01",
  "title": "Sequence convergence workshop",
  "difficulty": "University",
  "brief": "Analyze 12 sequences using limit laws, squeezing, subsequences, monotonicity/boundedness, and recursive arguments.",
  "estimatedMinutes": 65,
  "deliverables": [
    "12 convergence analyses",
    "two epsilon-N proofs"
  ],
  "constraints": [
    "Do not infer convergence from a fixed-point equation alone"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Sequences make “eventually” precise in a discrete setting. They connect pure analysis to numerical algorithms, where each iterate is one term in a sequence whose convergence must be justified.
