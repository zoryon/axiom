---

{
  "schemaVersion": 1,
  "id": "calc1.mean-value",
  "title": "Rolle and Mean Value Theorems",
  "subtitle": "How local derivative information controls global change",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Differential Calculus",
  "order": 160,
  "estimatedMinutes": 105,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.implicit-inverse"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "State Rolle’s theorem and the Mean Value Theorem with hypotheses",
    "Interpret MVT geometrically",
    "Use MVT to prove monotonicity and error bounds",
    "Recognize why continuity/differentiability hypotheses matter"
  ],
  "status": "published"
}

---

# Rolle and Mean Value Theorems

The Mean Value Theorem is the bridge between local slopes and global change. It says that over an interval, some instantaneous rate exactly matches the average rate. Many of the most important derivative consequences are disguised applications of this theorem.

## Rolle’s theorem

If `f` is continuous on `[a,b]`, differentiable on `(a,b)`, and `f(a)=f(b)`, then some `c∈(a,b)` has `f'(c)=0`. Geometrically, a smooth curve returning to the same height must have a horizontal tangent somewhere between.

## Mean Value Theorem

If `f` is continuous on `[a,b]` and differentiable on `(a,b)`, then there exists `c∈(a,b)` with `f'(c)=[f(b)-f(a)]/(b-a)`. Subtract the secant line from `f` and apply Rolle’s theorem to derive it.

## Monotonicity consequence

If `f'(x)>0` throughout an interval, then `f` is strictly increasing there. For `x<y`, MVT gives `f(y)-f(x)=f'(c)(y-x)>0`. Similarly, nonpositive derivatives imply nonincreasing behavior.

## Uniqueness and constant functions

If `f'=0` everywhere on an interval, MVT implies `f` is constant. If two differentiable functions have the same derivative on an interval, they differ by a constant. This result later underlies uniqueness of antiderivatives.

## Error bounds

If `|f'(x)|≤M` on an interval, then MVT yields `|f(y)-f(x)|≤M|y-x|`. This is a Lipschitz-type bound: derivative control gives quantitative stability. It is useful in numerical error estimates and perturbation analysis.

## Hypothesis failures

A corner can violate differentiability, and a jump can violate continuity; in either case the theorem may fail. Always state the interval and verify both endpoint continuity and interior differentiability before invoking MVT.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-mvt-01",
  "type": "single-choice",
  "prompt": "What does the Mean Value Theorem guarantee?",
  "options": [
    {
      "id": "a",
      "label": "The derivative is constant."
    },
    {
      "id": "b",
      "label": "The maximum occurs at an endpoint."
    },
    {
      "id": "c",
      "label": "Some interior derivative equals the average slope over the interval."
    },
    {
      "id": "d",
      "label": "Every interior derivative equals the average slope."
    }
  ],
  "answer": "c",
  "explanation": "Check the definition and theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-mvt-02",
  "type": "free-response",
  "prompt": "How does MVT prove that f'>0 implies f is strictly increasing?",
  "answer": "For x<y, MVT gives f(y)-f(x)=f'(c)(y-x) for some c between them. Both factors on the right are positive, so f(y)>f(x).",
  "explanation": "A complete answer should identify the relevant limit or derivative rule."
}
```

```exercise
{
  "id": "ex-calc1-mvt-01",
  "title": "Mean-value theorem reasoning",
  "difficulty": "University",
  "brief": "Verify theorem hypotheses, locate guaranteed points where possible, and use MVT to prove monotonicity, uniqueness and quantitative bounds.",
  "estimatedMinutes": 65,
  "deliverables": [
    "10 theorem-based solutions",
    "two counterexamples with missing hypotheses"
  ],
  "constraints": [
    "Name the theorem and verify each hypothesis before using it"
  ],
  "language": "math"
}
```

```lab
{
  "id": "lab-calc1-derivative-theorems",
  "title": "Derivative theorem proof lab",
  "brief": "Write a connected proof portfolio deriving three consequences of MVT: zero derivative implies constant, positive derivative implies strict increase, and a derivative bound implies a Lipschitz bound.",
  "estimatedMinutes": 90,
  "deliverables": [
    "three polished proofs",
    "one dependency diagram"
  ],
  "rubric": [
    "Correct hypotheses",
    "Logical structure",
    "Quantifier clarity",
    "Interpretation of conclusions"
  ]
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

MVT is the workhorse theorem behind derivative-based reasoning. It transforms pointwise information about `f'` into statements about the entire function—exactly the local-to-global move that makes calculus useful.
