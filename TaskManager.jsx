import { useState } from "react";
import { Plus, Check, Trash2, Flame, Clock, CircleDot } from "lucide-react";

const PROJECTS = ["NextShare", "FlyRank", "Gemini Ambassador", "LinkedIn", "Study"];
const PRIORITIES = [
  { key: "high", label: "High", color: "#E85D4E" },
  { key: "mid", label: "Mid", color: "#E8A73A" },
  { key: "low", label: "Low", color: "#5FA8A0" },
];

function stamp(date) {
  return date
    .toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .toUpperCase();
}

let idCounter = 4;

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Fix Redis session bug", project: "NextShare", priority: "high", done: false, ts: new Date(Date.now() - 3600e3) },
    { id: 2, title: "Draft internship highlight post", project: "LinkedIn", priority: "mid", done: false, ts: new Date(Date.now() - 7200e3) },
    { id: 3, title: "Complete Module III notes", project: "Study", priority: "low", done: true, ts: new Date(Date.now() - 86400e3) },
  ]);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState(PROJECTS[0]);
  const [priority, setPriority] = useState("mid");
  const [filter, setFilter] = useState("All");

  function addTask() {
    if (!title.trim()) return;
    setTasks((t) => [
      { id: idCounter++, title: title.trim(), project, priority, done: false, ts: new Date() },
      ...t,
    ]);
    setTitle("");
  }

  function toggleDone(id) {
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  }

  function removeTask(id) {
    setTasks((t) => t.filter((x) => x.id !== id));
  }

  const visible = tasks.filter((t) => filter === "All" || t.project === filter);
  const open = tasks.filter((t) => !t.done).length;
  const closed = tasks.length - open;

  return (
    <div className="bl-root">
      <style>{`
        .bl-root {
          background: #12151A;
          color: #E9E6DF;
          font-family: 'Courier New', ui-monospace, monospace;
          min-height: 100%;
          padding: 32px 20px;
        }
        .bl-header {
          max-width: 640px;
          margin: 0 auto 24px auto;
          border-bottom: 1px solid #2B2F37;
          padding-bottom: 16px;
        }
        .bl-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 28px;
          letter-spacing: 0.5px;
          margin: 0;
          color: #F4F1EA;
        }
        .bl-sub {
          font-size: 12px;
          color: #7C8291;
          margin-top: 6px;
          letter-spacing: 1px;
        }
        .bl-stats {
          display: flex;
          gap: 18px;
          margin-top: 12px;
          font-size: 12px;
          color: #9BA1AE;
        }
        .bl-stats b { color: #E9E6DF; }
        .bl-container { max-width: 640px; margin: 0 auto; }
        .bl-add {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          background: #191D24;
          border: 1px solid #2B2F37;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        .bl-input, .bl-select {
          background: #12151A;
          border: 1px solid #2B2F37;
          color: #E9E6DF;
          padding: 8px 10px;
          border-radius: 3px;
          font-family: inherit;
          font-size: 13px;
        }
        .bl-input { flex: 1; min-width: 160px; }
        .bl-input:focus, .bl-select:focus, .bl-btn:focus {
          outline: 2px solid #5FA8A0;
          outline-offset: 1px;
        }
        .bl-btn {
          background: #E8A73A;
          color: #12151A;
          border: none;
          padding: 8px 14px;
          border-radius: 3px;
          font-weight: 700;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        }
        .bl-btn:hover { background: #f0b652; }
        .bl-filters {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .bl-chip {
          font-size: 11px;
          padding: 5px 10px;
          border-radius: 999px;
          border: 1px solid #2B2F37;
          color: #9BA1AE;
          cursor: pointer;
          background: transparent;
        }
        .bl-chip.active { background: #E9E6DF; color: #12151A; border-color: #E9E6DF; }
        .bl-entry {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 10px;
          border-bottom: 1px dashed #2B2F37;
        }
        .bl-check {
          background: transparent;
          border: 1px solid #4A5060;
          width: 20px;
          height: 20px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .bl-check.done { background: #5FA8A0; border-color: #5FA8A0; }
        .bl-entry-body { flex: 1; min-width: 0; }
        .bl-entry-title { font-size: 14px; color: #E9E6DF; }
        .bl-entry-title.done { text-decoration: line-through; color: #6A6F7A; }
        .bl-meta { display: flex; gap: 10px; align-items: center; margin-top: 4px; flex-wrap: wrap; }
        .bl-tag { font-size: 10px; color: #9BA1AE; letter-spacing: 0.5px; }
        .bl-prio { font-size: 10px; display: flex; align-items: center; gap: 3px; }
        .bl-ts { font-size: 10px; color: #565B66; }
        .bl-del {
          background: transparent;
          border: none;
          color: #565B66;
          cursor: pointer;
          padding: 4px;
        }
        .bl-del:hover { color: #E85D4E; }
        .bl-empty { text-align: center; color: #565B66; font-size: 13px; padding: 40px 0; }
      `}</style>

      <div className="bl-header bl-container">
        <h1 className="bl-title">Build Log</h1>
        <div className="bl-sub">A running record of what's being shipped</div>
        <div className="bl-stats">
          <span><b>{open}</b> open</span>
          <span><b>{closed}</b> closed</span>
          <span><b>{tasks.length}</b> total</span>
        </div>
      </div>

      <div className="bl-container">
        <div className="bl-add">
          <input
            className="bl-input"
            placeholder="Log a new task…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <select className="bl-select" value={project} onChange={(e) => setProject(e.target.value)}>
            {PROJECTS.map((p) => <option key={p}>{p}</option>)}
          </select>
          <select className="bl-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
            {PRIORITIES.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
          </select>
          <button className="bl-btn" onClick={addTask}><Plus size={14} />Log it</button>
        </div>

        <div className="bl-filters">
          {["All", ...PROJECTS].map((p) => (
            <button
              key={p}
              className={`bl-chip ${filter === p ? "active" : ""}`}
              onClick={() => setFilter(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div>
          {visible.length === 0 && <div className="bl-empty">Nothing logged here yet.</div>}
          {visible.map((t) => {
            const prio = PRIORITIES.find((p) => p.key === t.priority);
            return (
              <div className="bl-entry" key={t.id}>
                <button
                  className={`bl-check ${t.done ? "done" : ""}`}
                  onClick={() => toggleDone(t.id)}
                  aria-label={t.done ? "Mark incomplete" : "Mark complete"}
                >
                  {t.done && <Check size={13} color="#12151A" />}
                </button>
                <div className="bl-entry-body">
                  <div className={`bl-entry-title ${t.done ? "done" : ""}`}>{t.title}</div>
                  <div className="bl-meta">
                    <span className="bl-tag">{t.project}</span>
                    <span className="bl-prio" style={{ color: prio.color }}>
                      <Flame size={10} />{prio.label}
                    </span>
                    <span className="bl-ts">
                      <Clock size={10} style={{ display: "inline", marginRight: 3 }} />
                      {stamp(t.ts)}
                    </span>
                  </div>
                </div>
                <button className="bl-del" onClick={() => removeTask(t.id)} aria-label="Delete task">
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
