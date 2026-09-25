---
{
  "schemaVersion": 1,
  "id": "c1.what-a-program-is",
  "title": "What a Program Is — Source, Translation and Execution",
  "subtitle": "A precise mental model of source code, translation, executable images and running processes",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "The Program and the Machine",
  "order": 10,
  "estimatedMinutes": 80,
  "difficulty": "Foundational",
  "prerequisites": [],
  "tags": [
    "c",
    "systems-programming",
    "machine-and-toolchain"
  ],
  "objectives": [
    "Distinguish source text, translation artifacts, executable files and processes",
    "Explain why C source is not executed directly by the CPU",
    "Trace the conceptual path from a .c file to machine instructions in memory",
    "Separate language semantics from operating-system and toolchain behavior"
  ],
  "status": "published"
}
---
# What a Program Is — Source, Translation and Execution

When you type C, you are writing a description in a programming language. The CPU does not read identifiers such as `total`, understand `for`, or know that a function is called `main`. A useful systems programmer keeps several layers separate: the C abstract machine defined by the language, the compiler that translates source, the executable format understood by an operating system, and the real processor that ultimately executes instructions.

This separation is not academic decoration. It explains why one source program can be compiled for several processors, why an optimizer may rearrange work while preserving observable behavior, why a program can compile but fail to start, and why two valid C implementations may make different choices about integer sizes or object layout.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Four different things people casually call “the program”

The source program is text: bytes that encode tokens, declarations and statements. A translation process consumes that text and produces one or more artifacts. A final executable file is a structured binary containing machine code, data and metadata. A process is a *running instance* created when an operating system loads an executable and establishes resources such as an address space, stack and file descriptors.

Conflating these layers causes bad debugging. A syntax error belongs to source/translation. An unresolved external symbol belongs to linking. “Permission denied” while starting an executable belongs to the operating environment. A segmentation fault happens during execution. The symptoms can look similar to a beginner—“my program does not work”—but the responsible layer is different.

## The C abstract machine

The C standard describes what a conforming C program means in terms of an abstract machine. It intentionally does not say that a local variable must live at a particular physical RAM address or that an `if` statement must compile to a specific jump instruction. This freedom allows implementations to target many machines and optimize aggressively.

Your first discipline is therefore to reason in two passes. First ask: *what behavior does C define for this program?* Only then ask: *how did this compiler and this machine realize that behavior?* Machine-level reasoning is powerful, but it cannot rescue a program whose C semantics are already undefined.

## Translation and execution are contracts between layers

A compiler accepts a source language and targets an execution environment. It may emit assembly, object code, diagnostics and debugging information. A linker combines separately translated pieces and libraries. A loader maps an executable and shared libraries into a process. The CPU executes instructions from that mapped image.

None of those steps magically understands your intention. Every layer follows a contract. Much of systems engineering consists of learning where one contract ends and the next begins.

## Observable behavior matters more than source appearance

Optimization becomes less mysterious once you stop expecting a one-to-one mapping between source statements and instructions. The implementation must preserve the behavior that the C language requires for a correct program; it does not generally need to preserve your source-level sequence literally. A calculation whose result can never be observed may disappear. A constant expression may be evaluated at translation time. Several source operations may become one instruction—or one source operation may expand into many.

This is why debugging optimized builds can feel strange and why undefined behavior is especially dangerous: if the language imposes no requirements for a case, an optimizer is not constrained by the behavior you hoped to see.

## Worked example — A minimal source program

```c
#include <stdio.h>

int main(void) {
    puts("hello, machine");
    return 0;
}
```

The text names a library interface and a function. It does not encode a syscall or a CPU instruction directly. The implementation decides how these abstractions map to the target environment.

## Failure modes to recognize

- Thinking the CPU executes C syntax directly
- Treating an executable file and a running process as the same object
- Assuming source order always equals instruction order
- Using one observed machine behavior as proof of what the C language guarantees

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-program-layers",
  "type": "single-choice",
  "prompt": "Which statement best distinguishes an executable file from a process?",
  "options": [
    {
      "id": "a",
      "label": "They are synonyms."
    },
    {
      "id": "b",
      "label": "An executable is stored program data; a process is a running instance with runtime resources."
    },
    {
      "id": "c",
      "label": "A process is source code after preprocessing."
    },
    {
      "id": "d",
      "label": "An executable exists only inside CPU registers."
    }
  ],
  "answer": "b",
  "explanation": "The executable is a file-format artifact. The operating system creates a process when that program is loaded and run."
}
```

```quiz
{
  "id": "q-c1-abstract-machine",
  "type": "free-response",
  "prompt": "Why is it useful to reason about the C abstract machine before looking at generated assembly?",
  "answer": "Because the language defines which program behaviors are required, implementation-defined, unspecified or undefined. Assembly only shows one implementation choice for one build; it cannot establish a guarantee the language does not make.",
  "explanation": "A correct source-level model prevents accidental dependence on one compiler or machine."
}
```

```task
{
  "id": "task-c1-layer-trace",
  "title": "Trace the lifecycle of a tiny program",
  "detail": "Create hello.c. On paper, list the distinct artifacts and runtime state you believe exist from source editing through execution. You will refine this model in the next lesson.",
  "estimatedMinutes": 20
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.

## Closing perspective

The target habit is simple: whenever something fails, identify the layer first. That habit scales from your first `printf` to production systems.
