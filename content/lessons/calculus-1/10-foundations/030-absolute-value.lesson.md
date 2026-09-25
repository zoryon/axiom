---

{
  "schemaVersion": 1,
  "id": "calc1.absolute-value",
  "title": "Absolute Value and Distance",
  "subtitle": "Distance on the line and the inequalities behind formal limits",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Foundations and the Real Number Line",
  "order": 30,
  "estimatedMinutes": 80,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.algebra-review"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Interpret |x-a| as distance",
    "Solve absolute-value equations and inequalities",
    "Use the triangle and reverse-triangle inequalities",
    "Translate distance inequalities into neighborhoods and intervals"
  ],
  "status": "published"
}

---

# Absolute Value and Distance

Absolute value is the natural language of distance on the real line. Formal limits are built from statements of the form `|x-a|<δ` and `|f(x)-L|<ε`, so geometric comfort with absolute value is foundational.

## Definition as distance

`|x|=x` for `x≥0` and `|x|=-x` for `x<0`. More importantly, `|x-a|` is the distance between `x` and `a`. It is nonnegative and vanishes exactly when the two points coincide.

## Neighborhoods

For `r>0`, `|x-a|<r` is equivalent to `a-r<x<a+r`; `|x-a|≤r` gives the closed interval. `0<|x-a|<r` describes a punctured neighborhood: points near `a` but excluding `a` itself.

## Triangle inequalities

The triangle inequality `|x+y|≤|x|+|y|` formalizes the fact that the direct distance is no longer than a broken path. The reverse triangle inequality `||x|-|y||≤|x-y|` controls how much distance from the origin can change when the input changes.

## Piecewise structure

Absolute-value formulas become ordinary formulas on regions where the sign is fixed. `|2x-3|` equals `3-2x` for `x<3/2` and `2x-3` for `x≥3/2`. This matters later when differentiating nonsmooth functions.

## Worked reasoning

`|x-4|<0.2` means `3.8<x<4.2`. To estimate `|x²-a²|`, factor it as `|x-a||x+a|`: one factor can be made small by controlling `x-a`; the other can be bounded once `x` is restricted near `a`. This is the basic architecture of many epsilon-delta estimates.

## Failure modes

Do not distribute absolute value over addition. `|x+y|` is generally not `|x|+|y|`. Do not solve `|x|<r` with only an upper bound. And remember that the triangle inequality is an inequality, not an identity.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-abs-01",
  "type": "single-choice",
  "prompt": "Which interval is equivalent to |x−3|<0.5?",
  "options": [
    {
      "id": "a",
      "label": "(−0.5,0.5)"
    },
    {
      "id": "b",
      "label": "(2.5,3.5)"
    },
    {
      "id": "c",
      "label": "(3,3.5)"
    },
    {
      "id": "d",
      "label": "[2.5,3.5]"
    }
  ],
  "answer": "b",
  "explanation": "Check the definition and all domain conditions before choosing."
}
```

```quiz
{
  "id": "q-calc1-abs-02",
  "type": "free-response",
  "prompt": "State the triangle inequality and explain it geometrically.",
  "answer": "For real x,y, |x+y|≤|x|+|y|. Travelling directly from 0 to x+y cannot be longer than travelling first to x and then by displacement y.",
  "explanation": "A strong answer states the definition and the reason it applies."
}
```

```exercise
{
  "id": "ex-calc1-abs-01",
  "title": "Distance and neighborhoods",
  "difficulty": "Core",
  "brief": "Solve absolute-value equations and inequalities and rewrite neighborhood statements as intervals.",
  "estimatedMinutes": 35,
  "deliverables": [
    "10 solved items",
    "two number-line sketches"
  ],
  "constraints": [
    "Give interval notation whenever applicable"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Once absolute value reads as distance rather than a symbol-manipulation trick, epsilon-delta limits become statements about nested neighborhoods instead of opaque notation.
