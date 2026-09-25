---
{
  "schemaVersion": 1,
  "id": "c1.files-io",
  "title": "Files, Streams and Text I/O",
  "subtitle": "Streams, file handles and robust text I/O at a trust boundary",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Files, Debugging and Integration",
  "order": 290,
  "estimatedMinutes": 90,
  "difficulty": "Core",
  "prerequisites": [
    "c1.nested-data"
  ],
  "tags": [
    "c",
    "systems-programming",
    "files-debugging-integration"
  ],
  "objectives": [
    "Open and close files with explicit error handling",
    "Explain streams and `FILE *` at an introductory level",
    "Read text lines safely into bounded buffers",
    "Distinguish I/O failure, end-of-file and parse failure"
  ],
  "status": "published"
}
---
# Files, Streams and Text I/O

Files introduce external state. Calls can fail because paths do not exist, permissions deny access, storage fails, or input does not match the expected format. Robust C code treats every I/O operation as a fallible boundary rather than assuming that local tests describe the production environment.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## `FILE *` is an opaque stream handle

The standard I/O library represents streams using `FILE`. You interact through functions such as `fopen`, `fclose`, `fgets`, `fprintf`, `fread` and `fwrite`. Do not depend on the internal layout of `FILE`; it is an implementation object managed through the library contract.

## Opening is fallible

`fopen` returns a null pointer when the stream cannot be opened. Check it before use and report enough context to diagnose the failure. When appropriate, `perror` or `strerror(errno)` can expose system error information, though `errno` has its own usage rules.

## Line input before numeric parsing

A robust text-input pattern is often: read a bounded line using `fgets`, then parse that in-memory string with a conversion routine such as `strtol` while checking the end pointer and range. This separates I/O from syntax validation better than relying on formatted scanning for arbitrary user input.

## EOF is not the same as error

When a read function stops, distinguish ordinary end-of-file from an I/O error where the API allows that distinction. For stream functions, `feof` and `ferror` answer different questions after an operation indicates failure/end.

## Worked example — Read lines with bounded storage

```c
#include <stdio.h>

int main(int argc, char **argv) {
    if (argc != 2) return 2;
    FILE *fp = fopen(argv[1], "r");
    if (!fp) { perror("fopen"); return 1; }

    char line[256];
    while (fgets(line, sizeof line, fp)) {
        fputs(line, stdout);
    }
    if (ferror(fp)) { perror("read"); fclose(fp); return 1; }
    if (fclose(fp) != 0) { perror("fclose"); return 1; }
    return 0;
}
```

This is a skeleton, not a full parser. The important habit is checking each boundary operation and distinguishing EOF from error.

## Failure modes to recognize

- Dereferencing/using a null `FILE *` after failed open
- Assuming every input line fits the fixed buffer
- Treating EOF as an error unconditionally
- Ignoring write/close errors in data-sensitive tools

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-eof-error",
  "type": "single-choice",
  "prompt": "After a read operation stops, why might `feof` and `ferror` both matter?",
  "options": [
    {
      "id": "a",
      "label": "They are synonyms"
    },
    {
      "id": "b",
      "label": "They distinguish normal end-of-file from an I/O error condition"
    },
    {
      "id": "c",
      "label": "They allocate buffers"
    },
    {
      "id": "d",
      "label": "They parse integers"
    }
  ],
  "answer": "b",
  "explanation": "End-of-file and I/O failure are different outcomes and should not be conflated."
}
```

```exercise
{
  "id": "ex-c1-file-summary",
  "title": "File statistics utility",
  "difficulty": "Core",
  "brief": "Write a CLI that opens a text file and reports line count, byte/character observations, longest bounded line segment and whether an I/O error occurred.",
  "estimatedMinutes": 90,
  "deliverables": [
    "file_stats.c",
    "README.md",
    "tests.md"
  ],
  "constraints": [
    "Check every open/close failure",
    "Do not use unbounded input",
    "Document behavior for lines longer than the buffer"
  ],
  "language": "c"
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
