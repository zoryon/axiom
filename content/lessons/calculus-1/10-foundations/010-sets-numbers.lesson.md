---

{
  "schemaVersion": 1,
  "id": "calc1.sets-numbers",
  "title": "Sets, Number Systems and Intervals",
  "subtitle": "Sets, order, intervals, bounds and the completeness of the real line",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Foundations and the Real Number Line",
  "order": 10,
  "estimatedMinutes": 85,
  "difficulty": "Foundational",
  "prerequisites": [],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Use set operations and interval notation precisely",
    "Distinguish ℕ, ℤ, ℚ and ℝ and explain the role of completeness",
    "Identify upper/lower bounds, extrema, supremum and infimum",
    "Translate set descriptions between symbols, inequalities and words"
  ],
  "status": "published"
}

---

# Sets, Number Systems and Intervals

University calculus begins with a language for saying exactly which values are under discussion. Sets organize that language; the ordered real line supplies the geometry; completeness explains why many limiting and existence arguments work at all.

## Sets and operations

A set is determined by its members. Write `x ∈ A` for membership and `A ⊆ B` when every element of `A` belongs to `B`. Union `A ∪ B` corresponds to “in A or B”; intersection `A ∩ B` to “in both”; difference `A \ B` to “in A but not B”. De Morgan laws connect set operations to logic and will reappear in discrete mathematics and probability.

## Number systems and completeness

The chain `ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ` reflects increasingly rich algebraic structure. Rationals are dense: between two distinct rationals lies another rational. Density is not completeness. The rational set `{q∈ℚ:q²<2}` is bounded above but has no least rational upper bound; in `ℝ` its supremum is `√2`. The least-upper-bound property of `ℝ` is one standard formulation of completeness.

## Intervals and order

`[a,b]`, `(a,b)`, `[a,b)`, and `(a,b]` encode endpoint inclusion. Infinite intervals such as `(-∞,a]` never include infinity; `∞` is not a real number. Translate interval notation to inequalities immediately: `x∈(a,b]` means `a<x≤b`.

## Bounds, extrema, supremum and infimum

`M` is an upper bound for `S` when every `x∈S` satisfies `x≤M`. A maximum is an upper bound that belongs to `S`; a supremum is the least upper bound and need not belong to `S`. Thus `(0,1)` has `sup=1` but no maximum. Analogous definitions apply to lower bounds, minimum and infimum.

## Worked reasoning

For `S={1-1/n:n≥1}`, every element is below `1`, values can be made arbitrarily close to `1`, and `1` is not attained. Hence `sup S=1`, while the minimum is `0`. For `A=[-2,3)` and `B=(1,5]`, `A∩B=(1,3)` and `A∪B=[-2,5]`. Each endpoint follows from membership, not visual guesswork.

## Failure modes

Do not treat infinity as an element of `ℝ`. Do not confuse a largest element with a least upper bound. Do not assume every bounded set contains its supremum. And do not equate “dense” with “complete”.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-sets-01",
  "type": "single-choice",
  "prompt": "Which statement is true for S=(0,1)?",
  "options": [
    {
      "id": "a",
      "label": "S has maximum 1."
    },
    {
      "id": "b",
      "label": "S has supremum 1 but no maximum."
    },
    {
      "id": "c",
      "label": "S has no upper bounds."
    },
    {
      "id": "d",
      "label": "sup S=0."
    }
  ],
  "answer": "b",
  "explanation": "Check the definition and all domain conditions before choosing."
}
```

```quiz
{
  "id": "q-calc1-sets-02",
  "type": "free-response",
  "prompt": "Why does density of ℚ not imply completeness?",
  "answer": "Density only says rationals occur between rationals. Completeness requires every nonempty set bounded above to possess a least upper bound in the same number system; ℚ fails this for sets whose natural bound is irrational.",
  "explanation": "A strong answer states the definition and the reason it applies."
}
```

```exercise
{
  "id": "ex-calc1-sets-01",
  "title": "Set and interval fluency",
  "difficulty": "Core",
  "brief": "Solve 12 items involving set operations, interval notation, bounds, suprema and infima.",
  "estimatedMinutes": 35,
  "deliverables": [
    "12 written solutions",
    "one paragraph distinguishing maximum from supremum"
  ],
  "constraints": [
    "Justify endpoint inclusion",
    "Do not use graphing software"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Completeness is one of the quiet engines of analysis. When a later theorem guarantees that a limit point, extremum or integral exists, the structure of the real numbers is often underneath the proof.
