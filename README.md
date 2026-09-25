# AXIOM Tutor Memory Patch

For an existing AXIOM Tutor installation, copy these files over the matching paths:

- `public/app.js`
- `public/styles.css`
- `server.mjs`
- `src/db.mjs`

Your existing `data/learning.sqlite` should NOT be replaced or deleted. On the next AXIOM start, the new `tutor_memory` table is created automatically with `CREATE TABLE IF NOT EXISTS`, preserving all existing progress, notes and attempts.

New workflow inside **Study with Tutor**:

1. Tutor prompts automatically include saved per-lesson memory.
2. At the end of a ChatGPT tutoring chat, click **COPY SESSION SUMMARY PROMPT**.
3. Paste that prompt into the same ChatGPT chat.
4. Copy ChatGPT's structured summary into **Save This Tutor Session** in AXIOM.
5. Save. The entry remains locally available and is included in future prompts for that lesson.

Run `npm run validate` after replacing the files.
