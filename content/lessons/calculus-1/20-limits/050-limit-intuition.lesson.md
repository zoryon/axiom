---

{
  "schemaVersion": 1,
  "id": "calc1.limit-intuition",
  "title": "The Limit Concept and Local Behavior",
  "subtitle": "What it means for a function to approach a value, independently of its value at the point",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Limits",
  "order": 50,
  "estimatedMinutes": 90,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.functions"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Read and interpret limit notation",
    "Distinguish a function value from a limiting value",
    "Estimate limits numerically and graphically without confusing evidence with proof",
    "Recognize one-sided limits and when a two-sided limit fails"
  ],
  "status": "published"
}

---

# The Limit Concept and Local Behavior

A limit describes local behavior near an input, not necessarily behavior at that input. This separation is the conceptual leap on which continuity, derivatives and integrals are built.

## Near a point, not at the point

`lim_{x→a} f(x)=L` says that values of `f(x)` can be forced arbitrarily close to `L` by taking `x` sufficiently close to `a`, with `x` allowed to differ from `a`. Therefore `f(a)` may equal `L`, may differ from `L`, or may not exist at all. A removable hole can leave the limit untouched.

## Numerical and graphical evidence

Tables and graphs are useful reconnaissance. Evaluate from both sides, use scales that reveal local structure, and ask whether outputs stabilize. But finite samples cannot prove a limit. A function can behave tamely at every sampled point and change on unsampled inputs.

## One-sided limits

`lim_{x→a^-} f(x)` examines inputs below `a`; `lim_{x→a^+} f(x)` examines inputs above. A finite two-sided limit exists exactly when both one-sided limits exist and are equal. A jump discontinuity therefore has distinct one-sided limits and no two-sided limit.

## Indeterminate appearance is not an answer

Direct substitution may produce `0/0`, `∞/∞`, or another form that signals further analysis. `0/0` is not a limit value; it says the substituted numerator and denominator both vanish and the local ratio depends on finer structure. Algebraic simplification, estimates or later tools are required.

## Worked reasoning

For `f(x)=(x²-1)/(x-1)` with `x≠1`, factor to get `f(x)=x+1`. Hence values approach `2` as `x→1`, regardless of whether `f(1)` is undefined. For `g(x)=|x|/x`, the left-hand limit at `0` is `-1` and the right-hand limit is `1`; the two-sided limit does not exist.

## Habits for limit problems

First locate domain issues. Second try direct substitution when valid. Third inspect one-sided behavior if the point is a boundary or sign-changing denominator. Fourth simplify only in ways valid on a punctured neighborhood. Finally distinguish a computed candidate from a proof of convergence.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-limit-intro-01",
  "type": "single-choice",
  "prompt": "If lim_{x→2} f(x)=5, what must be true?",
  "options": [
    {
      "id": "a",
      "label": "f(2)=5."
    },
    {
      "id": "b",
      "label": "f(2) must be defined."
    },
    {
      "id": "c",
      "label": "Values of f(x) become arbitrarily close to 5 for x sufficiently close to 2, x≠2."
    },
    {
      "id": "d",
      "label": "f(x)=5 on an entire interval around 2."
    }
  ],
  "answer": "c",
  "explanation": "The correct option follows from the limit definition or a valid limit law."
}
```

```quiz
{
  "id": "q-calc1-limit-intro-02",
  "type": "free-response",
  "prompt": "Why can a function have a limit at a point where it is undefined?",
  "answer": "Because the limit depends on values arbitrarily near the point, not on the value at the point itself. A punctured neighborhood can determine the limit even when the center is missing.",
  "explanation": "A strong response separates what happens near the point from what happens exactly at the point."
}
```

```exercise
{
  "id": "ex-calc1-limit-intro-01",
  "title": "Read local behavior",
  "difficulty": "Core",
  "brief": "Analyze 10 graphical/algebraic scenarios, distinguishing function values, one-sided limits and two-sided limits.",
  "estimatedMinutes": 40,
  "deliverables": [
    "10 justified answers",
    "one sketch exhibiting a removable discontinuity and one exhibiting a jump"
  ],
  "constraints": [
    "State left and right limits separately when relevant"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

The limit operator ignores the center and focuses on controllable behavior around it. That single idea makes it possible to repair holes, define instantaneous rates of change and reason about infinite processes.
