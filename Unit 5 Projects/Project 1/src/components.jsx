import { useState } from "react";
import { useTasks } from "./TaskContext.jsx";

export function TaskForm({ list, important = false, placeholder = "Add a task" }) {
  const { add } = useTasks();
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    add(value, list, important);
    setText("");
  };

  return (
    <form className="form" onSubmit={submit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
      <button type="submit">Add</button>
    </form>
  );
}

export function TaskItem({ task }) {
  const { toggle, star, remove } = useTasks();
  return (
    <li className={"item" + (task.done ? " done" : "")}>
      <input type="checkbox" checked={task.done} onChange={() => toggle(task.id)} aria-label="Mark done" />
      <span className="text">{task.text}</span>
      <span className="tag">{task.list}</span>
      <button
        className={"icon" + (task.important ? " on" : "")}
        onClick={() => star(task.id)}
        aria-label={task.important ? "Remove from important" : "Mark important"}
      >
        {task.important ? "★" : "☆"}
      </button>
      <button className="icon" onClick={() => remove(task.id)} aria-label="Delete task">
        ✕
      </button>
    </li>
  );
}

export function TaskList({ tasks, empty }) {
  if (!tasks.length) return <p className="empty">{empty}</p>;
  return (
    <ul className="list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </ul>
  );
}
