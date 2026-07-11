# Homework Submission — Build Log (Task Management App)

## 1. Prompts used

1. "Build a small React task management app called 'Build Log' — a builder's log style tracker for a student juggling multiple projects (internship, ambassador program, side project, LinkedIn content, study plan). Add task, mark complete, delete, filter by project, and priority tags (high/mid/low). Single-file component, no external CSS framework config, dark editorial 'lab notebook' theme, not the typical cream/terracotta AI-generated look."
2. "Add a stats row showing open/closed/total counts, and a timestamp on each task like a log entry."
3. "The delete button should be a subtle trash icon, not a full button — and add keyboard focus states for accessibility."
4. "Review the component for bugs: check that filtering doesn't break when a project has zero tasks, and that Enter key submits the input."

## 2. How AI helped

- Scaffolded the full component structure (state, handlers, JSX) in one pass instead of building it field-by-field, saving the initial setup time.
- Suggested the priority-as-colored-tag pattern and the dashed-divider "log entry" visual metaphor, which fit the "build log" concept better than a generic checklist UI.
- Generated the empty-state message and the CSS scoped to the component so it wouldn't leak styles.
- Caught and pre-emptively handled the empty-filter case (showing "Nothing logged here yet." instead of a blank screen).

## 3. Manual improvements / corrections made

- Removed the AI's first draft's use of `localStorage` for persistence — it isn't supported in this environment's sandbox, so state was moved to in-memory `useState` only, with a note that a real deployment would need a backend or `localStorage` (checked this works fine outside the sandbox).
- Fixed the initial timestamp formatting, which used `toLocaleTimeString()` alone and dropped the date — switched to a combined date+time format so older entries are distinguishable from today's.
- Tightened the color palette: the AI's first pass reused a near-black background with a single teal accent (the current "default AI look"); added a second accent color (amber) for priority tags and buttons so it didn't read as templated.
- Added `aria-label`s to the icon-only checkbox and delete buttons, which the AI omitted, for screen-reader accessibility.
- Manually re-tested the Enter-to-submit behavior and the delete/toggle logic against edge cases (empty title, deleting the last task in a filtered view) to confirm no stale state bugs.

## 4. Deliverable

`TaskManager.jsx` — single-file React component, no external state/config needed to run.
