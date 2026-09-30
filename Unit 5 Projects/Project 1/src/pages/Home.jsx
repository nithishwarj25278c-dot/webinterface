import { Link } from "react-router-dom";
import { useTasks } from "../TaskContext.jsx";
import { TaskForm, TaskList } from "../components.jsx";

export default function Home() {
  const { tasks } = useTasks();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const open = tasks.filter((t) => t.list === "daily" && !t.done);

  return (
    <section>
      <h1>{greeting}</h1>
      <p className="hint">
        {today}. You have {open.length} open daily {open.length === 1 ? "task" : "tasks"}.
      </p>
      <TaskForm list="daily" placeholder="Add a task for today" />
      <TaskList tasks={open.slice(0, 5)} empty="Nothing left for today." />
      <p className="hint">
        <Link to="/daily">Daily</Link> · <Link to="/weekly">Weekly</Link> · <Link to="/important">Important</Link> ·{" "}
        <Link to="/dashboard">Dashboard</Link>
      </p>
    </section>
  );
}
