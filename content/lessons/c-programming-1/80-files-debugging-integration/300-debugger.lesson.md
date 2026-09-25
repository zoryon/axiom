---
{
  "schemaVersion": 1,
  "id": "c1.debugger",
  "title": "Debugging with GDB: Breakpoints, Stack and State",
  "subtitle": "Use GDB to test hypotheses about control flow, stack frames and object state",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Files, Debugging and Integration",
  "order": 300,
  "estimatedMinutes": 105,
  "difficulty": "Core",
  "prerequisites": [
    "c1.files-io"
  ],
  "tags": [
    "c",
    "systems-programming",
    "files-debugging-integration"
  ],
  "objectives": [
    "Compile with debugging information",
    "Set breakpoints and step at source level",
    "Inspect local variables, parameters and call stacks",
    "Use a debugger to verify a prior hypothesis rather than explore blindly"
  ],
  "status": "published"
}
---
# Debugging with GDB: Breakpoints, Stack and State

A debugger is not a substitute for reasoning. It is an instrument for observing one execution. The strongest workflow is: reproduce the defect, state a hypothesis, choose a breakpoint that can falsify it, inspect state, and update the hypothesis. Random stepping teaches far less.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Build for debuggability

With GCC/Clang-like toolchains, `-g` emits debugging information. Lower optimization often makes source stepping more intuitive during early learning, but you should eventually debug optimized builds too because production behavior may depend on optimization and undefined behavior may surface differently.

## Breakpoints select evidence points

Stop before the suspected state transition, not fifty instructions after it. Conditional breakpoints are powerful when a bug occurs only for a particular loop index or input. Watchpoints can stop when memory changes, subject to debugger/platform support.

## Frames explain function context

`backtrace` shows the active call chain; selecting frames lets you inspect parameters and locals at different levels. This concrete stack view complements the abstract function-call model from earlier lessons. Remember that optimization can remove or relocate variables, so debugger presentation is not the language semantics.

## Inspect pointers cautiously

GDB can print pointer values, pointed-to data and memory ranges. That does not make an invalid dereference safe. If the program’s semantics say a pointer is dangling, reading it in the debugger is an investigation technique, not evidence the source access would be valid.

## Worked example — A deliberate debugging build

```bash
cc -std=c23 -Wall -Wextra -Wpedantic -g -O0 app.c -o app
gdb ./app
# In gdb:
break main
run
next
print variable
backtrace
```

Use the standard-selection flag supported by your installed compiler; some releases may spell C23 mode differently.

## Failure modes to recognize

- Stepping without a hypothesis
- Treating debugger-visible values as proof of portable semantics
- Forgetting that optimization can change source-level visibility
- Fixing the symptom at the crash line without tracing where invalid state originated

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-debugger-hypothesis",
  "type": "single-choice",
  "prompt": "Which debugging workflow is strongest?",
  "options": [
    {
      "id": "a",
      "label": "Step every line until something looks odd"
    },
    {
      "id": "b",
      "label": "State a falsifiable hypothesis, break where relevant state changes, inspect evidence, revise"
    },
    {
      "id": "c",
      "label": "Add random printf calls forever"
    },
    {
      "id": "d",
      "label": "Disable all warnings"
    }
  ],
  "answer": "b",
  "explanation": "Hypothesis-driven debugging turns observations into evidence and scales to complex systems."
}
```

```lab
{
  "id": "lab-c1-gdb-bug-hunt",
  "title": "GDB bug hunt",
  "brief": "Diagnose a program with three independent bugs using breakpoints, backtraces and state inspection. Before each debugger session, write the hypothesis you are testing.",
  "estimatedMinutes": 140,
  "deliverables": [
    "fixed.c",
    "debug-log.md"
  ],
  "rubric": [
    "Reproducible steps",
    "Hypothesis quality",
    "Appropriate breakpoint placement",
    "Root-cause fixes",
    "Clear explanation"
  ]
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
