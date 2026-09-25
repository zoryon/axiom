---

{
  "schemaVersion": 1,
  "id": "calc1.proof-patterns",
  "title": "Proof Patterns Used in Analysis",
  "subtitle": "Direct proof, contradiction, epsilon arguments, theorem application and counterexample design",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Synthesis and Proof Practice",
  "order": 290,
  "estimatedMinutes": 100,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.power-series"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Recognize common proof structures used in first-year analysis",
    "Write theorem applications with hypotheses separated from conclusions",
    "Construct counterexamples when hypotheses are removed",
    "Turn informal limit/continuity reasoning into quantified arguments"
  ],
  "status": "published"
}

---

# Proof Patterns Used in Analysis

Calculus at university level is not only computation. You must also know why procedures work, when theorems apply, and how to disprove statements that overreach. This lesson collects the proof patterns already used throughout the course and makes them explicit.

## Direct proof and definition chasing

A direct proof begins from the hypotheses and applies definitions or known results until the conclusion follows. Epsilon-delta proofs are definition chasing: start with an arbitrary tolerance, choose a control parameter, and verify the implication. Good direct proofs make dependencies visible rather than hiding them in prose.

## Contrapositive and contradiction

To prove `P⇒Q`, sometimes proving `not Q⇒not P` is cleaner. Contradiction assumes the hypotheses and the negation of the conclusion, then derives impossibility. Use these forms when the direct route is awkward, but do not invoke contradiction as decoration when a direct proof is simpler.

## Existence proofs via theorems

IVT and EVT are templates for existence. A rigorous application has three parts: verify each hypothesis, state the theorem, then state exactly what object exists. Do not smuggle uniqueness or a numerical location into a theorem that only gives existence.

## Counterexamples

A universal statement is disproved by one valid counterexample. To design one, identify which hypothesis was removed and choose a function that violates the desired conclusion for precisely that reason: open intervals for unattained extrema, jumps for failed IVT conclusions, corners for continuity without differentiability.

## Proof by inequalities

Many analysis proofs reduce an unknown quantity to something easier to bound. Triangle inequality, squeeze theorem, derivative bounds and remainder estimates all fit the pattern `target ≤ controllable expression`. The art lies in selecting a bound that tends to the required tolerance.

## Quantifiers and scope

“For every ε there exists δ” differs fundamentally from “there exists δ for every ε.” Likewise, a statement true for every point may allow a parameter to depend on the point, whereas uniform statements require one parameter to work globally. Read quantifiers before manipulating formulas.

## Proof-editing checklist

Define symbols before use; state domains; name the theorem; verify hypotheses; avoid phrases such as “obvious” where a nontrivial implication occurs; distinguish equality from approximation; and end with the exact desired conclusion. A proof is executable reasoning: another reader should be able to verify each transition.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-proof-01",
  "type": "single-choice",
  "prompt": "What is enough to disprove a universal statement?",
  "options": [
    {
      "id": "a",
      "label": "Many numerical examples."
    },
    {
      "id": "b",
      "label": "One valid counterexample."
    },
    {
      "id": "c",
      "label": "A graph that looks wrong."
    },
    {
      "id": "d",
      "label": "A failed algebraic attempt."
    }
  ],
  "answer": "b",
  "explanation": "Choose the statement whose hypotheses and conclusion match the theorem exactly."
}
```

```quiz
{
  "id": "q-calc1-proof-02",
  "type": "free-response",
  "prompt": "What are the three parts of a clean theorem application?",
  "answer": "Verify the theorem’s hypotheses in the current problem, state/invoke the theorem, then state only the conclusion that theorem guarantees in the current variables.",
  "explanation": "A strong answer identifies the proof structure and the theorem or definition that carries the argument."
}
```

```exercise
{
  "id": "ex-calc1-proof-01",
  "title": "Proof-pattern portfolio",
  "difficulty": "University",
  "brief": "Write six short proofs/counterexamples: an epsilon proof, an IVT existence proof, an EVT argument, an MVT consequence, a convergence argument and a counterexample.",
  "estimatedMinutes": 80,
  "deliverables": [
    "six polished proofs",
    "one paragraph classifying the proof pattern used in each"
  ],
  "constraints": [
    "Every theorem application must list hypotheses",
    "No numerical plotting as proof"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Proof writing is disciplined dependency management. The same habit that makes mathematical arguments reliable—explicit assumptions, valid transformations, exact conclusions—also improves reasoning about programs and systems.
