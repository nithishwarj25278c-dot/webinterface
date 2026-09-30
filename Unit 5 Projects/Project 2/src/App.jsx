import { NavLink, Route, Routes } from "react-router-dom";
import Lookup from "./pages/Lookup.jsx";
import ReportCard from "./pages/ReportCard.jsx";
import Admin from "./pages/Admin.jsx";
import { COLLEGE_NAME } from "./config.js";

export default function App() {
  return (
    <>
      <header className="top no-print">
        <strong>{COLLEGE_NAME}</strong>
        <nav>
          <NavLink to="/" end>Report card</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Lookup />} />
          <Route path="/report/:regNo" element={<ReportCard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </>
  );
}
