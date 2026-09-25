---

{
  "schemaVersion": 1,
  "id": "calc1.mixed-problems",
  "title": "Mixed Analysis Problems",
  "subtitle": "Choosing tools when the problem does not announce which chapter it belongs to",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Synthesis and Proof Practice",
  "order": 300,
  "estimatedMinutes": 120,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.proof-patterns"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Select methods across limits, continuity, derivatives, integrals and series",
    "Combine multiple theorems in one argument",
    "Check hypotheses before applying computational techniques",
    "Write complete solutions under exam-like conditions"
  ],
  "status": "published"
}

---

# Mixed Analysis Problems

Real exams and real technical work do not label problems “use the chain rule” or “apply IVT”. The hard part is often classification: recognizing structure, choosing a tool, and knowing when a familiar technique does not apply.

## Problem triage

Start by identifying the object: function limit, local rate, global extremum, accumulated quantity, sequence or series. Then list domain/singularity information. Only after that choose tools. This prevents reflexively applying a derivative rule to an existence question or a convergence test to a finite-sum problem.

## Multi-theorem arguments

A single problem may require continuity to prove existence, derivative signs to prove uniqueness, and numerical approximation to estimate the solution. Keep each theorem’s role explicit. For example: IVT gives a root, MVT/monotonicity gives uniqueness, and bisection approximates it.

## Reverse reasoning

Sometimes a desired error bound suggests the needed approximation degree; a desired monotonicity conclusion suggests studying the derivative; a desired derivative inequality suggests applying MVT backward to function differences. Expert problem solving often begins from the target and asks what theorem would make it true.

## Sanity checks

Check units, signs, domains, endpoint behavior and limiting cases. A derivative of a dimensioned quantity should carry rate units. A probability-like integral should not be negative when density is nonnegative. A claimed maximum on an open domain may not be attained. Sanity checks catch errors that symbolic algebra misses.

## Communication standard

A strong solution has a short plan, relevant formulas, justified theorem use, and a concluding sentence that answers the original question. Long algebra without a logical spine is difficult to grade and difficult to debug.

## Representative synthesis

Suppose `f(x)=x³+x-1`. Continuity plus endpoint sign change proves a root in `(0,1)`. Since `f'(x)=3x²+1>0`, the root is unique. Bisection can approximate it. If a tolerance on the root is specified, interval length after `n` bisections gives an explicit iteration count. This one problem combines existence, uniqueness and computation.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-mixed-01",
  "type": "single-choice",
  "prompt": "What is the best first step in a mixed calculus problem?",
  "options": [
    {
      "id": "a",
      "label": "Differentiate immediately."
    },
    {
      "id": "b",
      "label": "Search for a memorized formula."
    },
    {
      "id": "c",
      "label": "Identify the mathematical object, domain and what conclusion is requested."
    },
    {
      "id": "d",
      "label": "Use numerical software."
    }
  ],
  "answer": "c",
  "explanation": "Choose the statement whose hypotheses and conclusion match the theorem exactly."
}
```

```quiz
{
  "id": "q-calc1-mixed-02",
  "type": "free-response",
  "prompt": "Give an example of a three-stage argument using different calculus ideas.",
  "answer": "For a nonlinear equation: use continuity and IVT to prove a root exists, derivative sign/MVT to prove uniqueness, then bisection or another numerical method to approximate the root with an error bound.",
  "explanation": "A strong answer identifies the proof structure and the theorem or definition that carries the argument."
}
```

```exercise
{
  "id": "ex-calc1-mixed-01",
  "title": "Mixed calculus set",
  "difficulty": "University",
  "brief": "Solve a 12-problem mixed set without chapter labels. Problems combine limits, theorem use, curve analysis, optimization, integration and convergence.",
  "estimatedMinutes": 100,
  "deliverables": [
    "12 complete solutions",
    "method-selection note before each solution"
  ],
  "constraints": [
    "No external symbolic solver",
    "State theorem hypotheses where used"
  ],
  "language": "math"
}
```

```lab
{
  "id": "lab-calc1-midterm-simulation",
  "title": "Calculus I timed assessment",
  "brief": "Complete a 120-minute closed-notes mixed assessment covering foundations through derivative applications, then self-audit every error by category.",
  "estimatedMinutes": 150,
  "deliverables": [
    "timed solutions",
    "error log",
    "corrected solutions"
  ],
  "rubric": [
    "Concept selection",
    "Algebraic accuracy",
    "Theorem hypotheses",
    "Proof clarity",
    "Time management"
  ]
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Mixed work turns isolated techniques into mathematical judgment. The goal is not to remember which chapter a method came from, but to see the structure that makes the method valid.
