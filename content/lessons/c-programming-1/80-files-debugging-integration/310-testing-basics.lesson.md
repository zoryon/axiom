---
{
  "schemaVersion": 1,
  "id": "c1.testing-basics",
  "title": "Testing C Programs and Designing Test Cases",
  "subtitle": "Testing as systematic sampling of behavior, especially boundaries and failure paths",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Files, Debugging and Integration",
  "order": 310,
  "estimatedMinutes": 90,
  "difficulty": "Core",
  "prerequisites": [
    "c1.debugger"
  ],
  "tags": [
    "c",
    "systems-programming",
    "files-debugging-integration"
  ],
  "objectives": [
    "Design test cases from contracts and partitions",
    "Distinguish example tests from boundary and negative tests",
    "Write a minimal C test harness without external frameworks",
    "Explain why passing tests do not prove correctness"
  ],
  "status": "published"
}
---
# Testing C Programs and Designing Test Cases

Testing is not “run the program a few times.” Start from the contract, partition the input space, select representatives—especially boundaries—and make expected results explicit. A test suite gives evidence against particular classes of mistakes; it is never a proof that no defect exists.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Derive tests from the specification

If a function accepts counts from 0 through 100, partitions may include empty, singleton, typical interior, maximum, and invalid-above-maximum if invalid values can reach the boundary. For ordered data, include already sorted, reverse sorted, duplicates and equal elements. Each category comes from a semantic distinction, not randomness.

## Assertions can build a tiny test harness

For learning projects, a test executable can call functions with fixed inputs and use `assert` or a custom comparison/reporting helper. Keep production input validation separate from test assertions. A failing test should identify the case clearly rather than aborting with no context when possible.

## Failure paths need tests

It is easy to test successful file reads and forget missing files, truncated lines, invalid numbers, zero-length arrays or null optional pointers. Reliability comes disproportionately from exercising unhappy paths because those are the branches rarely hit during manual demos.

## Tests protect refactoring

Once behavior is captured, you can simplify internals and rerun tests to detect regressions. But tests coupled to implementation details can make improvement harder. Prefer observable contract behavior unless a low-level invariant genuinely requires internal testing.

## Worked example — A tiny explicit test

```c
#include <assert.h>

static int abs_int(int x) { return x < 0 ? -x : x; }

static void test_abs(void) {
    assert(abs_int(0) == 0);
    assert(abs_int(5) == 5);
    assert(abs_int(-5) == 5);
}

int main(void) {
    test_abs();
    return 0;
}
```

Even this simple example raises a deeper contract issue at `INT_MIN`, where mathematical negation may not be representable. Good tests reveal specification questions.

## Failure modes to recognize

- Testing only typical inputs
- Writing tests after bugs without updating the underlying contract
- Assuming 100% passing tests proves no undefined behavior
- Coupling every test to private implementation details

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-test-boundary",
  "type": "single-choice",
  "prompt": "Why are boundary values disproportionately useful in tests?",
  "options": [
    {
      "id": "a",
      "label": "CPUs execute them faster"
    },
    {
      "id": "b",
      "label": "Many defects come from < versus <=, empty/full capacity, and transition points"
    },
    {
      "id": "c",
      "label": "They eliminate the need for other tests"
    },
    {
      "id": "d",
      "label": "They guarantee formal correctness"
    }
  ],
  "answer": "b",
  "explanation": "Boundary conditions exercise exactly where branch/range semantics change."
}
```

```exercise
{
  "id": "ex-c1-test-suite",
  "title": "Build a contract-driven test suite",
  "difficulty": "Core",
  "brief": "Create a standalone test executable for your array and string utilities. Derive tests from equivalence classes and boundaries before writing assertions.",
  "estimatedMinutes": 100,
  "deliverables": [
    "tests.c",
    "test-plan.md"
  ],
  "constraints": [
    "Include negative/failure cases",
    "Every test group must reference a contract property",
    "No reliance on test execution order"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
