import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import TaskPage from "./pages/TaskPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const links = [
  ["/", "Home"],
  ["/daily", "Daily"],
  ["/weekly", "Weekly"],
  ["/important", "Important"],
  ["/dashboard", "Dashboard"],
];

export default function App() {
  return (
    <>
      <header className="top">
        <strong className="brand">Tasks</strong>
        <nav>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<TaskPage title="Daily" hint="What needs doing today." list="daily" />} />
          <Route path="/weekly" element={<TaskPage title="Weekly" hint="Bigger goals for this week." list="weekly" />} />
          <Route path="/important" element={<TaskPage title="Important" hint="Star any task to pin it here." onlyImportant />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<p className="empty">Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
