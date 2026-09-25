---
{
  "schemaVersion": 1,
  "id": "c1.pointer-safety",
  "title": "Null, Dangling and Invalid Pointers",
  "subtitle": "Validity depends on lifetime, bounds, type and the operation—not merely non-nullness",
  "course": "c-programming-1",
  "track": "Computer Science",
  "module": "Pointers and Indirection",
  "order": 250,
  "estimatedMinutes": 95,
  "difficulty": "Core",
  "prerequisites": [
    "c1.pointers-functions"
  ],
  "tags": [
    "c",
    "systems-programming",
    "pointers"
  ],
  "objectives": [
    "Differentiate null, dangling, uninitialized and out-of-bounds pointers",
    "Explain why non-null is not sufficient for safe dereference",
    "Recognize lifetime-related invalidation",
    "Adopt pointer validation habits appropriate to C APIs"
  ],
  "status": "published"
}
---
# Null, Dangling and Invalid Pointers

“Check for null” is not a memory-safety strategy. A pointer can be non-null yet designate an object whose lifetime ended, point one past an array, have insufficient alignment for the access, or otherwise be invalid for the intended operation. Safety comes from maintaining provenance/lifetime/bounds contracts, with null checks handling only one possible state.

```callout
{
  "tone": "important",
  "title": "Course standard",
  "body": "For normative language details, prefer the current C standard (ISO/IEC 9899:2024, commonly called C23) and your compiler documentation; examples in this course deliberately avoid compiler-specific extensions unless explicitly labeled."
}
```

## Null represents no valid designation

A null pointer compares unequal to any pointer to an object or function. It is useful for optional references and sentinel states. Dereferencing it is invalid. Use the null pointer constant forms supported by your chosen C version/toolchain style and do not assume its bit pattern is universally all zero bytes.

## Dangling pointers outlive the object they once designated

If a function returns the address of an automatic local object, that object’s lifetime ends when the function returns. The pointer may still contain bits, but using it to access the former object is invalid. Dynamic allocation creates similar hazards after deallocation, which C Programming II will cover in depth.

## One-past and out-of-range

One-past pointers are boundary markers, not dereferenceable elements. Pointer arithmetic that escapes the permitted array domain is itself a problem. Modern secure-C guidance explicitly treats out-of-bounds pointer formation/use as undefined behavior cases, not merely bad dereferences.

## Initialize pointers and narrow their scope

Uninitialized automatic pointer objects can hold indeterminate values. Initialize pointers when practical, keep them in the smallest useful scope, and establish validity before dereference. A local pointer whose meaning is obvious for ten lines is easier to audit than one reassigned across a 500-line function.

## Worked example — A dangling-return bug

```c
int *bad_pointer(void) {
    int local = 42;
    return &local;
}

/* local no longer exists after bad_pointer returns. */
```

The defect is about object lifetime, not whether the numeric address happens to still contain 42 for a while.

## Failure modes to recognize

- Treating non-null as proof of validity
- Returning addresses of automatic locals
- Using a one-past pointer as an element
- Leaving pointer objects uninitialized
- Continuing to use pointers after the designated storage has been invalidated

## Engineering reasoning checklist

- What objects or values exist at this point, and which types describe them?
- Which assumptions are guaranteed by the C language, which by this interface, and which are merely observations of one implementation?
- What are the boundary cases, and what happens on failure?
- Can you explain the code without appealing to “the compiler probably does X”?

```quiz
{
  "id": "q-c1-nonnull",
  "type": "multiple-choice",
  "prompt": "Which pointer states can be non-null yet still unsafe to dereference?",
  "options": [
    {
      "id": "a",
      "label": "A pointer to an object whose lifetime has ended"
    },
    {
      "id": "b",
      "label": "A one-past array pointer"
    },
    {
      "id": "c",
      "label": "An invalidly formed/out-of-bounds pointer"
    },
    {
      "id": "d",
      "label": "A valid pointer to a live object"
    }
  ],
  "answer": [
    "a",
    "b",
    "c"
  ],
  "explanation": "Nullness is only one property. Lifetime, bounds, alignment/type and operation all matter."
}
```

```lab
{
  "id": "lab-c1-pointer-safety",
  "title": "Pointer safety casebook",
  "brief": "Analyze and repair a suite of pointer bugs: dangling local addresses, invalid one-past dereference, uninitialized pointers, null output parameters and alias-sensitive logic. Verify the repaired cases with warnings and available sanitizers.",
  "estimatedMinutes": 150,
  "deliverables": [
    "repairs.c",
    "casebook.md",
    "test-notes.md"
  ],
  "rubric": [
    "Correct semantic diagnosis",
    "Minimal repair",
    "Contract clarity",
    "Tool-assisted verification without overclaiming"
  ]
}
```

## Before you mark this lesson complete

You should be able to explain the central model aloud without notes, predict the worked example before running it, and justify every answer in the practice block. If you can only recognize the explanation when reading it, treat the lesson as *in progress*, not learned.
