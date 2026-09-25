---
{
  "schemaVersion": 1,
  "id": "c1.functions-basics",
  "title": "Functions, Parameters and Return Values",
  "subtitle": "Functions as typed contracts for decomposition, reuse and local reasoning",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Functions and Modularity",
  "order": 130,
  "estimatedMinutes": 80,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.problem-decomposition"
  ],
  "tags": [
    "c",
    "systems-programming",
    "functions"
  ],
  "objectives": [
    "Declare and define functions with explicit parameter and return types",
    "Explain C argument passing by value",
    "Design function contracts around one responsibility",
    "Recognize when output parameters are appropriate"
  ],
  "status": "published"
}
---
# Functions, Parameters and Return Values

Functions let you reason locally. A caller should need the contract, not the implementation details; the implementation should be able to assume documented preconditions. C passes argument values into parameter objects, which is simple but has important consequences once arrays and pointers enter the picture.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Prototype, definition and call

A function declaration introduces its name and function type. A prototype supplies parameter type information that allows calls to be checked. A definition provides the body. Make declarations visible before use and prefer explicit parameter lists such as `int f(void)` rather than old-style forms.

## Arguments are evaluated; parameters are initialized

For ordinary scalar parameters, changing the parameter changes only that local parameter object. If the caller needs to expose another object for mutation, it can pass a pointer designating that object. This is still pass-by-value: the pointer value itself is copied into the parameter.

## Return values versus output parameters

Use a return value when a function naturally computes one result. Output parameters become useful for multiple outputs, large aggregates, or APIs where the return value is reserved for status. They add pointer preconditions, so do not introduce them merely to imitate other languages.

## Small does not mean fragmented

A function earns its existence when it names a concept, isolates an invariant, provides reuse, or enables independent testing. A ten-line function with one clear responsibility is excellent; ten one-line wrappers with no semantic value are not automatically better.

## Worked example — Value passing

```c
static void increment_copy(int x) {
    x += 1;
}

int main(void) {
    int n = 10;
    increment_copy(n);
    /* n is still 10 */
    return 0;
}
```

The parameter `x` is a distinct object initialized with the value of `n`.

## Failure modes to recognize

- Calling a function before a valid declaration is visible
- Assuming scalar parameters alias caller variables
- Using global variables instead of returning data explicitly
- Designing one function with several unrelated responsibilities

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-pass-by-value",
  "type": "single-choice",
  "prompt": "A function receives an `int x` parameter. Assigning `x = 99` normally does what to the caller’s integer argument object?",
  "options": [
    {
      "id": "a",
      "label": "Always changes it to 99"
    },
    {
      "id": "b",
      "label": "Does not directly change it; x is a separate parameter object"
    },
    {
      "id": "c",
      "label": "Frees it"
    },
    {
      "id": "d",
      "label": "Makes the behavior undefined"
    }
  ],
  "answer": "b",
  "explanation": "C passes argument values. Pointer values can later be used to designate caller objects, but the pointer parameter is itself still passed by value."
}
```

```exercise
{
  "id": "ex-c1-function-contracts",
  "title": "Refactor a monolithic program into contracts",
  "difficulty": "Core",
  "brief": "Take a provided monolithic calculator program and split parsing-independent arithmetic into typed functions. Write pre/postconditions for each function.",
  "estimatedMinutes": 60,
  "deliverables": [
    "calculator.c",
    "contracts.md"
  ],
  "constraints": [
    "No mutable globals",
    "Every nontrivial function must have one sentence describing its responsibility"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
