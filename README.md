# Build Log

A small task management app styled as a builder's running log — for tracking work across multiple parallel projects instead of one flat to-do list.

## Features

- Add tasks with a project tag (NextShare, FlyRank, Gemini Ambassador, LinkedIn, Study) and a priority (High / Mid / Low)
- Mark tasks complete / incomplete
- Delete tasks
- Filter the log by project
- Live stats: open, closed, and total task counts
- Each task is timestamped like a log entry

## Tech stack

- React (functional components, `useState`)
- `lucide-react` for icons
- Scoped inline CSS (no Tailwind/config dependency) — dark "lab notebook" theme

## Project structure

```
TaskManager.jsx    # single-file component — all state, logic, and styles
```

## Running it

This is a single self-contained component with no external data dependencies. Drop it into any React project (Vite, Next.js, Create React App) that has `lucide-react` installed:

```bash
npm install lucide-react
```

Then render it:

```jsx
import TaskManager from "./TaskManager";

export default function App() {
  return <TaskManager />;
}
```

## Notes / limitations

- State is in-memory only — tasks reset on page refresh. To persist data, add `localStorage` (browser-only environments) or wire it to a backend/database.
- Project and priority lists are hardcoded in `PROJECTS` and `PRIORITIES` at the top of the file — edit those arrays to customize.

## Credits

Built with AI assistance (Claude) as part of a homework assignment on using AI as a development tool. See `submission.md` for the prompts used, how AI helped, and manual corrections made.
