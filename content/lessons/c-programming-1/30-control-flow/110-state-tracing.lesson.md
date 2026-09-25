---
{
  "schemaVersion": 1,
  "id": "c1.state-tracing",
  "title": "Tracing State by Hand",
  "subtitle": "Manual execution as a disciplined debugging and reasoning technique",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Control Flow and Program Reasoning",
  "order": 110,
  "estimatedMinutes": 70,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.loops"
  ],
  "tags": [
    "c",
    "systems-programming",
    "control-flow"
  ],
  "objectives": [
    "Trace object values through a program without running it",
    "Separate expression evaluation from resulting state changes",
    "Represent call frames and local state at an introductory level",
    "Use traces to validate branch and loop reasoning"
  ],
  "status": "published"
}
---
# Tracing State by Hand

Before using a debugger, you should be able to execute small programs on paper. Manual tracing builds the same state-model muscles that later let you inspect a crash dump or concurrency timeline. The technique is deliberately slow: record the current program point, the live objects, and the exact change caused by each statement.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Trace tables remove vague intuition

Create columns for the program point and each relevant object. Record values only after an operation whose effect you can justify. If a branch is not taken, note why. For loops, one row per iteration is often enough.

This exposes a common beginner error: mentally substituting what a variable *means* for what value it actually holds at that moment.

## Function calls create new local state

A function call establishes parameters and local automatic objects for that invocation. At this level, model that as a new logical frame with its own names. Returning destroys the lifetime of those automatic locals, while the returned value is transferred according to the function semantics.

Later, GDB will show a concrete stack representation, but the language-level lifetime concept comes first.

## Trace before debugging tools

If you can predict a program, then run it under a debugger and compare, discrepancies become informative. If you jump directly into a debugger without a hypothesis, you may watch values change without understanding why.

## Worked example — Trace this by hand

```c
int f(int x) {
    int y = x + 2;
    if (y % 2 == 0) {
        y /= 2;
    } else {
        y = y * 3 + 1;
    }
    return y;
}

int main(void) {
    int a = 5;
    int b = f(a);
    a += b;
    return a > 10 ? 0 : 1;
}
```

Create a row for entering `main`, before/after the call, each line in `f`, return, and the final condition.

## Failure modes to recognize

- Skipping “obvious” intermediate values
- Changing several variables mentally at once
- Confusing a function parameter with the caller object it was initialized from
- Using runtime output instead of completing the trace first

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-trace-call",
  "type": "free-response",
  "prompt": "When `f(a)` is called with an `int` parameter in ordinary C, is the parameter object the same object as `a`? Explain.",
  "answer": "No. The parameter is a separate object initialized from the argument value. Assigning to the parameter does not directly modify the caller’s `a`. Later, pointers can be passed when a function needs to designate caller-owned objects.",
  "explanation": "Value passing and object identity are distinct concepts."
}
```

```task
{
  "id": "task-c1-trace-five",
  "title": "Five traces before execution",
  "detail": "For five small programs from this module, predict all outputs and final object values on paper before running them. Mark every mistaken prediction and explain the source of the mismatch.",
  "estimatedMinutes": 45
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
