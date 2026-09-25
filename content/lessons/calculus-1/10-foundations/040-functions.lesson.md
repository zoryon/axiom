---

{
  "schemaVersion": 1,
  "id": "calc1.functions",
  "title": "Functions, Domains, Ranges and Composition",
  "subtitle": "Functions as mappings with domains, composition, inverse structure and elementary families",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Foundations and the Real Number Line",
  "order": 40,
  "estimatedMinutes": 95,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.absolute-value"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Treat a function as a mapping with a specified domain",
    "Determine domains of composed algebraic, radical and logarithmic functions",
    "Compute and interpret compositions",
    "Recognize injectivity and construct inverse branches"
  ],
  "status": "published"
}

---

# Functions, Domains, Ranges and Composition

Calculus studies functions, not isolated formulas. A domain is part of the function. Two identical formulas on different domains can have different inverses, extrema and continuity properties.

## Mapping viewpoint

Write `f:A→B` for a function from domain `A` to codomain `B`. Each `x∈A` has exactly one output. The range is the subset of `B` actually attained. Graphs and formulas represent functions, but the mathematical object also includes its allowed inputs.

## Domain discipline

Rational functions exclude denominator zeros; square roots over the reals require nonnegative radicands; logarithms require positive arguments. For `f∘g`, an input must belong to the domain of `g`, and `g(x)` must lie in the domain of `f`.

## Composition

`(f∘g)(x)=f(g(x))`. Order matters and domains can differ. Composition models multi-stage processes and later powers the chain rule. Always compute the inner function first and then check that its output is legal for the outer function.

## Injectivity and inverses

A function is injective when equal outputs force equal inputs. Only then does it have a genuine inverse on its image. `x²` is not injective on all reals but becomes invertible when restricted to `[0,∞)`, where the inverse is `√x`.

## Elementary families

Polynomials are globally defined on `ℝ`; rational functions may have poles; exponentials are positive and invertible; logarithms are their inverses; trigonometric functions are periodic and require restricted branches for inverses. You will later study their limits and derivatives, but domain and qualitative behavior come first.

## Worked reasoning

For `h(x)=√(1-x²)`, the domain condition `1-x²≥0` gives `[-1,1]`. If `f(x)=x²+1` and `g(x)=2x-3`, then `(f∘g)(x)=(2x-3)²+1` while `(g∘f)(x)=2x²-1`; composition is not commutative.

## Failure modes

Do not infer the original domain from a simplified expression. Do not confuse inverse `f^{-1}` with reciprocal `1/f`. Do not assume every function has an inverse, and do not ignore the domain of a composition.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-func-01",
  "type": "single-choice",
  "prompt": "What is the domain of √(1−x²)?",
  "options": [
    {
      "id": "a",
      "label": "All reals"
    },
    {
      "id": "b",
      "label": "(−1,1)"
    },
    {
      "id": "c",
      "label": "[−1,1]"
    },
    {
      "id": "d",
      "label": "[0,1]"
    }
  ],
  "answer": "c",
  "explanation": "Check the definition and all domain conditions before choosing."
}
```

```quiz
{
  "id": "q-calc1-func-02",
  "type": "free-response",
  "prompt": "Why does x² fail to have an inverse on all of ℝ?",
  "answer": "It is not injective: x and −x have the same square. Restricting the domain to one monotone half-line, such as [0,∞), produces an invertible branch.",
  "explanation": "A strong answer states the definition and the reason it applies."
}
```

```exercise
{
  "id": "ex-calc1-func-01",
  "title": "Domain and composition workshop",
  "difficulty": "Core",
  "brief": "Determine domains, compositions, ranges where feasible and inverse branches for a mixed set of elementary functions.",
  "estimatedMinutes": 45,
  "deliverables": [
    "12 worked problems",
    "one domain/range table"
  ],
  "constraints": [
    "State domain restrictions before simplification",
    "Check inverse identities on the correct domains"
  ],
  "language": "math"
}
```

```task
{
  "id": "task-calc1-foundations-review",
  "title": "Foundations retrieval sheet",
  "detail": "Without notes, define subset, supremum, absolute-value neighborhood, domain, range, injective function and inverse. Then check and correct your definitions.",
  "estimatedMinutes": 20
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

A precise function model is the object-level foundation for the rest of calculus. Limits, derivatives and integrals make claims about mappings on specified domains, not merely about strings of symbols.
