---

{
  "schemaVersion": 1,
  "id": "calc1.infinite-limits",
  "title": "Infinite Limits and Asymptotic Behavior",
  "subtitle": "Unbounded growth, vertical asymptotes and limits at infinity",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Limits",
  "order": 70,
  "estimatedMinutes": 95,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.limit-laws"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Interpret infinite limits as unbounded behavior rather than finite limit values",
    "Analyze one-sided behavior near vertical asymptotes",
    "Evaluate rational limits at infinity using dominant terms",
    "Distinguish vertical, horizontal and oblique asymptotic statements"
  ],
  "status": "published"
}

---

# Infinite Limits and Asymptotic Behavior

The symbol `∞` describes unbounded behavior, not a real number that functions “reach”. Infinite limits and limits at infinity extend the language of local convergence to growth without bound and long-run behavior.

## Infinite limits near finite points

Writing `lim_{x→a} f(x)=+∞` means: for every large threshold `M`, values of `f(x)` exceed `M` whenever `x` is sufficiently close to `a` (subject to the relevant side). It does not mean the function takes the value infinity. One-sided signs matter around poles.

## Vertical asymptotes

If at least one one-sided limit at `x=a` is `±∞`, the line `x=a` is a vertical asymptote. For `1/(x-a)`, approaching from the right gives `+∞` while approaching from the left gives `-∞`; the two-sided infinite limit is not a single signed infinity.

## Limits at infinity

`lim_{x→∞} f(x)=L` asks about values for sufficiently large positive `x`. Here the input moves without bound while the output may converge. Horizontal asymptotes express finite limits at `±∞`, and the two directions may differ.

## Dominant-term analysis for rational functions

For a ratio of polynomials, divide numerator and denominator by the highest relevant power of `x`. If numerator degree is smaller, the ratio tends to zero. Equal degrees yield the ratio of leading coefficients. If the numerator degree exceeds the denominator degree, the function is generally unbounded or follows a polynomial/oblique asymptote after division.

## Rates and sign discipline

Large magnitude alone is not enough; sign determines `+∞` versus `-∞`. Near a denominator zero of odd multiplicity, signs often flip across the pole; even multiplicity can preserve sign. At infinity, leading terms control polynomial signs once `|x|` is sufficiently large.

## Worked reasoning

For `(3x²-x+1)/(2x²+5)`, divide by `x²` to obtain `(3-1/x+1/x²)/(2+5/x²)→3/2`. For `1/(x-2)²`, both one-sided limits at `2` are `+∞`; for `1/(x-2)`, the sides have opposite signs.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-infinite-01",
  "type": "single-choice",
  "prompt": "What does lim_{x→a} f(x)=+∞ mean?",
  "options": [
    {
      "id": "a",
      "label": "f(a) equals the real number infinity."
    },
    {
      "id": "b",
      "label": "The function eventually becomes constant."
    },
    {
      "id": "c",
      "label": "For every M>0, f(x)>M when x is sufficiently close to a (with x≠a)."
    },
    {
      "id": "d",
      "label": "The domain ends at a."
    }
  ],
  "answer": "c",
  "explanation": "The correct option follows from the limit definition or a valid limit law."
}
```

```quiz
{
  "id": "q-calc1-infinite-02",
  "type": "free-response",
  "prompt": "Explain why 1/(x−2) has different one-sided infinite limits at x=2.",
  "answer": "The denominator is negative just left of 2 and positive just right of 2, while its magnitude tends to zero. Therefore the quotient becomes large negative from the left and large positive from the right.",
  "explanation": "A strong response separates what happens near the point from what happens exactly at the point."
}
```

```exercise
{
  "id": "ex-calc1-infinite-01",
  "title": "Asymptotic analysis",
  "difficulty": "Core",
  "brief": "Analyze rational and elementary functions near poles and at ±∞, including sign and asymptote classification.",
  "estimatedMinutes": 50,
  "deliverables": [
    "12 worked limits",
    "asymptote summary for four functions"
  ],
  "constraints": [
    "Separate left/right behavior at vertical asymptotes",
    "Do not treat ∞ algebraically as a real number"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Asymptotic notation is a language of thresholds and eventual behavior. The disciplined interpretation of infinity as “arbitrarily large magnitude” prepares you for convergence tests, improper integrals and algorithmic growth analysis.
