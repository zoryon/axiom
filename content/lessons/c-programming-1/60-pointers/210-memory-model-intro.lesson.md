---
{
  "schemaVersion": 1,
  "id": "c1.memory-model-intro",
  "title": "Addresses, Objects and the Memory Model",
  "subtitle": "Objects occupy storage; addresses designate locations; values and representations are not the same thing",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Pointers and Indirection",
  "order": 210,
  "estimatedMinutes": 100,
  "difficulty": "Core",
  "prerequisites": [
    "c1.bounds"
  ],
  "tags": [
    "c",
    "systems-programming",
    "pointers"
  ],
  "objectives": [
    "Define object, value and object representation at a useful introductory level",
    "Explain what an address conceptually designates",
    "Use `sizeof` and byte-oriented inspection without assuming universal layouts",
    "Separate abstract-machine objects from simplistic “box in RAM” metaphors"
  ],
  "status": "published"
}
---
# Addresses, Objects and the Memory Model

Pointers become easy only after the underlying nouns are precise. C talks about objects—regions of data storage whose contents can represent values. An object has a type, lifetime and representation. An address is not “the value inside the object”; it is part of how a program can designate storage.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Object versus value

An object is storage; a value is an abstract member of a type’s value set. Assigning `x = 5` changes the stored representation of `x` so that reading it as its type yields the value 5. This distinction matters for copying bytes, padding, effective typing rules and later serialization work.

## Bytes are the unit exposed by `sizeof`

`sizeof(T)` reports a number of bytes, where a C byte is the size of `char` and contains `CHAR_BIT` bits. Modern general-purpose machines almost always use 8-bit bytes, but portable C expresses sizes in bytes, not fixed octets. `unsigned char` is the standard workhorse for examining raw object representations.

## Address is not necessarily an integer

Many machines implement addresses as integer-like virtual addresses, but portable C pointer semantics are richer than “just store a number.” Pointer representations can differ by type and implementation. Avoid building the mental model around casts to integer addresses; think “designates an object/function or special state” first.

## Alignment and layout exist even before pointers

Types can impose alignment requirements, and structures may contain padding so members are properly aligned. You do not need the full object model yet, but you should expect `sizeof(struct)` to exceed the sum of member sizes and avoid assuming a universal byte layout for portable data formats.

## Worked example — Inspect representation safely

```c
#include <stdio.h>

int main(void) {
    unsigned int x = 0x12345678u;
    unsigned char *bytes = (unsigned char *)&x;
    for (size_t i = 0; i < sizeof x; ++i) {
        printf("%02X ", bytes[i]);
    }
    putchar('\n');
}
```

Character types have special permission to inspect object representations. The observed byte order describes this implementation, not a portable serialization format.

## Failure modes to recognize

- Equating an object with the value currently stored in it
- Assuming every C byte is universally eight bits
- Assuming a pointer is portably just an integer address
- Serializing a struct by dumping its bytes without considering layout/padding/endian issues

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-object-value",
  "type": "single-choice",
  "prompt": "Which description is most precise?",
  "options": [
    {
      "id": "a",
      "label": "An object is identical to its current mathematical value"
    },
    {
      "id": "b",
      "label": "An object is storage whose representation can encode a value of its type"
    },
    {
      "id": "c",
      "label": "An object is always heap memory"
    },
    {
      "id": "d",
      "label": "Only structs are objects"
    }
  ],
  "answer": "b",
  "explanation": "C objects are regions of data storage with type/lifetime/representation properties."
}
```

```task
{
  "id": "task-c1-representation-observe",
  "title": "Observe object bytes",
  "detail": "Inspect the byte representation of several unsigned integer values on your machine. Record byte order as an observation and explicitly state why it must not be assumed as a portable file format.",
  "estimatedMinutes": 40
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
