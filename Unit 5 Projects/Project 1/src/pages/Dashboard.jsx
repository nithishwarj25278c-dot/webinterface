import { useTasks } from "../TaskContext.jsx";

function Bar({ label, done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="row">
      <div className="row-head">
        <span>{label}</span>
        <span>
          {done}/{total} · {pct}%
        </span>
      </div>
      <div className="bar">
        <div style={{ width: pct + "%" }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { tasks } = useTasks();
  const by = (fn) => tasks.filter(fn);
  const stat = (fn) => ({ total: by(fn).length, done: by((t) => fn(t) && t.done).length });
  const all = stat(() => true);
  const importantOpen = by((t) => t.important && !t.done).length;

  return (
    <section>
      <h1>Dashboard</h1>
      <div className="stats">
        <div><b>{all.total}</b><span>Total</span></div>
        <div><b>{all.done}</b><span>Done</span></div>
        <div><b>{all.total - all.done}</b><span>Remaining</span></div>
        <div><b>{importantOpen}</b><span>Important open</span></div>
      </div>
      <Bar label="Overall" {...all} />
      <Bar label="Daily" {...stat((t) => t.list === "daily")} />
      <Bar label="Weekly" {...stat((t) => t.list === "weekly")} />
      <Bar label="Important" {...stat((t) => t.important)} />
    </section>
  );
}
