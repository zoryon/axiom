---

{
  "schemaVersion": 1,
  "id": "calc1.optimization",
  "title": "Optimization Problems",
  "subtitle": "From verbal constraints to mathematical models, candidates and defensible optima",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Applications of Derivatives",
  "order": 200,
  "estimatedMinutes": 100,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.taylor"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Translate verbal optimization problems into objective and constraint equations",
    "Reduce constrained one-variable problems to a valid domain",
    "Use derivative tests and endpoint checks to identify optima",
    "Interpret mathematical optima in the original context"
  ],
  "status": "published"
}

---

# Optimization Problems

Optimization is where modeling quality matters as much as differentiation. The derivative can only optimize the function you wrote down; if variables, constraints or domains are wrong, perfect calculus produces the wrong engineering answer.

## Model first

Identify decision variables, units, objective and constraints. Use the constraints to reduce the problem to one independent variable whenever possible. State the physically or logically valid domain before differentiating.

## Existence and candidates

On a closed bounded feasible interval with continuous objective, EVT guarantees an optimum exists. Interior optima are candidates at derivative-zero or nondifferentiable points; boundaries must also be checked. On open/unbounded domains, existence needs separate analysis.

## Second-order and sign tests

A first-derivative sign change gives robust classification. The second-derivative test can be faster at stationary points but may be inconclusive. Always compare actual objective values when seeking global rather than merely local optima.

## Sensitivity and assumptions

A mathematical optimum depends on assumptions: material thickness, cost model, ignored losses, allowed geometry. In engineering, document those assumptions and ask whether small parameter changes dramatically alter the optimum.

## Worked reasoning

For a rectangle with perimeter `P`, write sides `x` and `P/2-x`; area is `A(x)=x(P/2-x)` on `0≤x≤P/2`. Then `A'=P/2-2x`, so the interior critical point is `x=P/4`. Endpoints give area zero; the critical point yields the global maximum, a square.

## Optimization workflow

Sketch the system, assign variables, write constraints, derive a one-variable objective, establish the domain, prove/argue existence, find candidates, classify/compare, then translate the result back with units. Skipping the domain or endpoint steps is a common source of false answers.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-opt-01",
  "type": "single-choice",
  "prompt": "In a closed-interval optimization problem, what must be checked for an absolute optimum?",
  "options": [
    {
      "id": "a",
      "label": "Only derivative-zero points."
    },
    {
      "id": "b",
      "label": "Only endpoints."
    },
    {
      "id": "c",
      "label": "Interior critical points and endpoints."
    },
    {
      "id": "d",
      "label": "Only points where the second derivative is positive."
    }
  ],
  "answer": "c",
  "explanation": "Use derivative sign information and theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-opt-02",
  "type": "free-response",
  "prompt": "Why should the feasible domain be established before differentiating?",
  "answer": "Because the mathematical objective may have stationary points outside the physically or logically allowed set, and endpoint constraints can determine the true optimum.",
  "explanation": "A complete answer should connect the derivative information to the global conclusion."
}
```

```exercise
{
  "id": "ex-calc1-opt-01",
  "title": "Model-and-optimize problem set",
  "difficulty": "University",
  "brief": "Solve six optimization problems involving geometry, cost, distance and rate constraints.",
  "estimatedMinutes": 75,
  "deliverables": [
    "six full models and solutions",
    "units and feasible domains for every variable"
  ],
  "constraints": [
    "State assumptions explicitly",
    "Check endpoints whenever the feasible set is closed"
  ],
  "language": "math"
}
```

```lab
{
  "id": "lab-calc1-optimization-case",
  "title": "Engineering optimization case",
  "brief": "Choose one realistic design variable problem, create a one-variable model, justify the feasible set, optimize it and perform a small sensitivity analysis around the optimum.",
  "estimatedMinutes": 120,
  "deliverables": [
    "model derivation",
    "optimization analysis",
    "sensitivity table",
    "one-page interpretation"
  ],
  "rubric": [
    "Model correctness",
    "Domain discipline",
    "Calculus correctness",
    "Interpretation and assumptions"
  ]
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Optimization combines theorem use, symbolic work and modeling judgment. The mature habit is to prove you solved the right constrained problem—not merely to set a derivative equal to zero.
