---

{
  "schemaVersion": 1,
  "id": "calc1.taylor",
  "title": "Taylor Polynomials and Local Approximation",
  "subtitle": "Approximating smooth functions by polynomials and controlling local error",
  "course": "calculus-1",
  "track": "Mathematics & Science",
  "module": "Applications of Derivatives",
  "order": 190,
  "estimatedMinutes": 110,
  "difficulty": "Foundational",
  "prerequisites": [
    "calc1.convexity"
  ],
  "tags": [
    "calculus",
    "analysis"
  ],
  "objectives": [
    "Construct Taylor polynomials from derivatives at a center",
    "Explain why matching derivatives yields local approximation",
    "Use low-order Taylor approximations numerically",
    "Interpret remainder terms and approximation error"
  ],
  "status": "published"
}

---

# Taylor Polynomials and Local Approximation

Taylor polynomials compress local behavior into algebra. By matching a function’s value and successive derivatives at one point, a polynomial can reproduce increasingly rich local structure. This is one of the main bridges from pure calculus to numerical computation.

## Matching derivative data

The degree-`n` Taylor polynomial of `f` about `a` is `P_n(x)=Σ_{k=0}^n f^{(k)}(a)(x-a)^k/k!`. The coefficients are chosen so that `P_n` and `f` have the same derivatives through order `n` at `a`.

## Linearization and quadratic approximation

The first-order polynomial `f(a)+f'(a)(x-a)` is the tangent-line approximation. Adding `f''(a)(x-a)²/2` captures curvature. Near the center, higher powers shrink quickly when `|x-a|` is small.

## Standard examples

About zero, `e^x≈1+x+x²/2+...`, `sin x≈x-x³/6+...`, and `cos x≈1-x²/2+...`. These are not merely memorized series: each coefficient comes directly from derivative values at zero.

## Remainder and error

Taylor’s theorem supplies a remainder. In Lagrange form, `R_n(x)=f^{(n+1)}(ξ)(x-a)^{n+1}/(n+1)!` for some `ξ` between `a` and `x`, under appropriate smoothness. Bounding the next derivative on the interval gives a practical error bound.

## Numerical thinking

Approximation quality depends on distance from the center, derivative growth and degree. More terms do not automatically solve every problem globally. Numerical algorithms also face floating-point rounding, cancellation and cost, topics developed later in Numerical Computing.

## Worked reasoning

Approximate `e^{0.1}` with `P_2=1+x+x²/2`: `1.105`. Since the third derivative is `e^x`, on `[0,0.1]` it is at most `e^{0.1}`; the remainder magnitude is at most `e^{0.1}(0.1)^3/6`, under two ten-thousandths. The approximation is therefore quantitatively justified.

## Practice and retrieval

```quiz
{
  "id": "q-calc1-taylor-01",
  "type": "single-choice",
  "prompt": "What determines the coefficients of a Taylor polynomial centered at a?",
  "options": [
    {
      "id": "a",
      "label": "Only function values at endpoints."
    },
    {
      "id": "b",
      "label": "Roots of the function."
    },
    {
      "id": "c",
      "label": "Derivatives of the function at a, divided by factorials."
    },
    {
      "id": "d",
      "label": "Numerical regression."
    }
  ],
  "answer": "c",
  "explanation": "Use derivative sign information and theorem hypotheses."
}
```

```quiz
{
  "id": "q-calc1-taylor-02",
  "type": "free-response",
  "prompt": "Why does a Taylor polynomial approximate well near its center?",
  "answer": "It matches the function and several derivatives at the center, so the first unmatched term occurs at higher order in x−a; powers of a small displacement shrink rapidly when derivative magnitudes are controlled.",
  "explanation": "A complete answer should connect the derivative information to the global conclusion."
}
```

```exercise
{
  "id": "ex-calc1-taylor-01",
  "title": "Taylor approximation and error",
  "difficulty": "University",
  "brief": "Construct first- through fourth-order Taylor polynomials for several elementary functions and bound approximation errors.",
  "estimatedMinutes": 70,
  "deliverables": [
    "eight Taylor polynomials",
    "four numerical approximations",
    "four rigorous remainder bounds"
  ],
  "constraints": [
    "State the expansion center",
    "Justify derivative bounds used in remainders"
  ],
  "language": "math"
}
```

## Before you mark this lesson complete

You should be able to reproduce the central definitions without looking them up, solve a representative problem from a blank page, and explain why each hypothesis in the main theorem or method matters. If you can only follow the worked examples while reading, keep the lesson in progress and return to the practice after a short break.

## Closing perspective

Taylor approximation converts local derivative information into computable polynomial models. It is foundational for scientific computing, numerical ODEs, optimization and error analysis.
