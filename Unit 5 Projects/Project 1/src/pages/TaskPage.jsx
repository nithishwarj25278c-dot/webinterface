import { useTasks } from "../TaskContext.jsx";
import { TaskForm, TaskList } from "../components.jsx";

export default function TaskPage({ title, hint, list, onlyImportant = false }) {
  const { tasks, clearDone } = useTasks();
  const match = (t) => (!list || t.list === list) && (!onlyImportant || t.important);
  const shown = tasks.filter(match);
  const doneCount = shown.filter((t) => t.done).length;

  return (
    <section>
      <h1>{title}</h1>
      <p className="hint">{hint}</p>
      {list && <TaskForm list={list} />}
      <TaskList tasks={shown} empty={onlyImportant ? "No important tasks yet. Tap ☆ on any task." : `No ${title.toLowerCase()} tasks yet. Add one above.`} />
      {doneCount > 0 && (
        <button className="link" onClick={() => clearDone(match)}>
          Clear {doneCount} completed
        </button>
      )}
    </section>
  );
}
