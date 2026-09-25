---
{
  "schemaVersion": 1,
  "id": "c1.scope-storage-duration",
  "title": "Scope, Lifetime and Storage Duration",
  "subtitle": "Name visibility and object lifetime are related but different dimensions",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Functions and Modularity",
  "order": 140,
  "estimatedMinutes": 95,
  "difficulty": "Foundational",
  "prerequisites": [
    "c1.functions-basics"
  ],
  "tags": [
    "c",
    "systems-programming",
    "functions"
  ],
  "objectives": [
    "Distinguish scope, linkage and storage duration conceptually",
    "Predict where an identifier is visible",
    "Explain automatic versus static storage duration at an introductory level",
    "Avoid returning designations to dead automatic objects"
  ],
  "status": "published"
}
---
# Scope, Lifetime and Storage Duration

C has several concepts that beginners often collapse into “lifetime.” *Scope* answers where a name can be used. *Storage duration* concerns how long an object’s storage exists. *Linkage* concerns whether declarations in different scopes/translation units can denote the same entity. Keeping these dimensions separate is essential for multi-file programs and pointer safety.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Block scope and file scope

A local declaration inside a block normally gives the identifier block scope from its declaration to the end of the block, subject to nested scopes that can hide it. Declarations outside functions have file scope. Shadowing is legal in many cases but can make reasoning harder; warning flags can help detect accidental shadowing.

## Automatic storage duration

Most ordinary local objects have automatic storage duration. Their lifetime begins when execution enters the relevant declaration/block conditions and ends when execution leaves the block, with details for variably modified objects beyond this course’s immediate scope. A pointer to such an object does not extend its lifetime.

## Static storage duration

Objects declared at file scope and objects declared with `static` in appropriate contexts can have static storage duration: their storage exists for the program execution. A block-scope `static` object keeps state across calls, which can be useful but introduces hidden shared state and complicates reentrancy/testing.

## Lifetime failures are semantic failures

Returning `&local` from a function does not “keep the stack variable alive.” Once the object’s lifetime ends, a pointer that used to designate it cannot be dereferenced as though the object remained. Later we will describe dangling pointers in more detail.

## Worked example — Static local state

```c
#include <stddef.h>

size_t next_id(void) {
    static size_t counter = 0;
    return ++counter;
}
```

The identifier `counter` has block scope, but the object has static storage duration. Those are separate properties.

## Failure modes to recognize

- Equating “not visible” with “does not exist”
- Returning the address of an automatic local object
- Using static locals for convenience without considering hidden state
- Shadowing important identifiers in nested blocks

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-scope-duration",
  "type": "single-choice",
  "prompt": "A block-scope `static int counter;` has which combination?",
  "options": [
    {
      "id": "a",
      "label": "File scope and automatic storage duration"
    },
    {
      "id": "b",
      "label": "Block scope and static storage duration"
    },
    {
      "id": "c",
      "label": "No scope and dynamic storage duration"
    },
    {
      "id": "d",
      "label": "Function scope and thread storage duration only"
    }
  ],
  "answer": "b",
  "explanation": "Its name is visible in the block, while its object persists for the program’s static storage duration."
}
```

```task
{
  "id": "task-c1-scope-map",
  "title": "Map scope and lifetime separately",
  "detail": "For a supplied nested-block program, draw one map for identifier visibility and a second timeline for object lifetimes. Do not combine them.",
  "estimatedMinutes": 35
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
