---
{
  "schemaVersion": 1,
  "id": "c1.toolchain",
  "title": "Compiler, Assembler, Linker and Loader",
  "subtitle": "Preprocessing, compilation, assembly, linking and loading as inspectable stages",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "The Program and the Machine",
  "order": 20,
  "estimatedMinutes": 90,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.what-a-program-is"
  ],
  "tags": [
    "c",
    "systems-programming",
    "machine-and-toolchain"
  ],
  "objectives": [
    "Describe the major stages of a conventional C toolchain",
    "Use compiler options to stop after preprocessing, assembly or object generation",
    "Explain symbols, object files and why link errors differ from compile errors",
    "Inspect artifacts instead of treating the compiler driver as a black box"
  ],
  "status": "published"
}
---
# Compiler, Assembler, Linker and Loader

A command such as `cc main.c -o app` looks like one operation, but it usually coordinates several logically distinct stages. Learning to expose those stages turns the toolchain from magic into a diagnostic instrument. You should know what information exists after preprocessing, what an object file contains that an executable does not yet contain, and why declarations can compile even when definitions are missing.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Preprocessing: transforming preprocessing tokens

Before ordinary compilation, directives such as `#include`, `#define`, conditional inclusion and line control are handled. Header inclusion is conceptually textual inclusion after preprocessing rules; it is not an import system in the module sense. Macros operate on tokens, not typed C values.

Running `cc -E file.c` is often the fastest way to understand a surprising macro expansion or missing declaration. The output can be huge because system headers expand substantially, but the relevant region is still inspectable.

## Compilation: semantics and target instructions

The compiler proper parses declarations and expressions, checks constraints, performs semantic analysis, transforms the program internally, optimizes according to the selected mode and emits target-specific assembly or another lower-level form. Diagnostics generated here concern things such as incompatible types, malformed expressions or violated constraints.

Compilation can succeed for a call to a function whose body is not present because a declaration is enough to type-check the call. Resolving the body is a later responsibility.

## Assembly and object files

An assembler converts textual assembly into relocatable machine code and metadata stored in an object file. “Relocatable” matters: addresses of external functions or data may not yet be final. Object files also carry symbol tables, relocation entries, sections and optionally debugging information.

Use tools such as `nm`, `objdump` or `readelf` on Unix-like systems to inspect them. You do not need to memorize every section today; the goal is to know that an object file is structured, not merely a bag of opcodes.

## Linking and loading

The linker combines object files and libraries, resolves references, assigns addresses within the output image and produces an executable or library. A missing definition normally appears here as an undefined-reference error. At run time, the operating system loader maps the executable and needed shared libraries, prepares process state and transfers control through the platform startup path toward your program.

Static and dynamic linking make different trade-offs, but the important beginner distinction is temporal: compile-time type information, link-time symbol resolution and run-time behavior are different phases.

## Worked example — Expose the stages

```bash
cc -E hello.c > hello.i
cc -S hello.i -o hello.s
cc -c hello.s -o hello.o
cc hello.o -o hello

# Useful inspection
nm hello.o
objdump -d hello.o
```

Exact option support varies by toolchain, but GCC- and Clang-compatible drivers commonly support these forms.

## Failure modes to recognize

- Calling every toolchain failure a “compiler error”
- Putting function definitions in headers without understanding multiple-definition consequences
- Assuming `#include` dynamically loads a library
- Ignoring warnings because an executable was still produced

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-toolchain-stage",
  "type": "single-choice",
  "prompt": "A call is type-correct because a declaration is visible, but no definition is supplied anywhere. Which stage most commonly reports the failure?",
  "options": [
    {
      "id": "a",
      "label": "Preprocessing"
    },
    {
      "id": "b",
      "label": "Parsing only"
    },
    {
      "id": "c",
      "label": "Linking"
    },
    {
      "id": "d",
      "label": "CPU instruction fetch"
    }
  ],
  "answer": "c",
  "explanation": "The declaration lets compilation check the call; the linker later fails to resolve the referenced symbol."
}
```

```exercise
{
  "id": "ex-c1-artifact-inspection",
  "title": "Dissect one translation unit",
  "difficulty": "Core",
  "brief": "Compile a tiny two-function program through separate preprocessing, assembly and object stages. Record what changes at each stage and inspect symbols in the object file.",
  "estimatedMinutes": 50,
  "deliverables": [
    "notes.md",
    "main.c",
    "captured compiler commands"
  ],
  "constraints": [
    "Use warning flags such as -Wall -Wextra where supported",
    "Do not copy an explanation from a tutorial; explain each artifact from your own observations"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
