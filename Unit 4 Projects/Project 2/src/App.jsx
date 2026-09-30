import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h2>Nithishwar J</h2>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <footer>
        <h3>Nithishwar J</h3>
        <p>CSE Cybersecurity Student</p>
        <p>© 2026 Nithishwar J. All Rights Reserved.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;