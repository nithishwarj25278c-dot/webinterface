import { createContext, useContext, useEffect, useState } from "react";

const KEY = "todo-app-tasks";
const Ctx = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const add = (text, list, important = false) =>
    setTasks((t) => [
      { id: Date.now() + Math.random().toString(36).slice(2), text, list, important, done: false },
      ...t,
    ]);
  const toggle = (id) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const star = (id) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, important: !x.important } : x)));
  const remove = (id) => setTasks((t) => t.filter((x) => x.id !== id));
  const clearDone = (match) => setTasks((t) => t.filter((x) => !(x.done && match(x))));

  return <Ctx.Provider value={{ tasks, add, toggle, star, remove, clearDone }}>{children}</Ctx.Provider>;
}

export const useTasks = () => useContext(Ctx);
