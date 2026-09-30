import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Lookup() {
  const [regNo, setRegNo] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const value = regNo.trim();
    if (value) navigate(`/report/${encodeURIComponent(value)}`);
  };

  return (
    <section className="narrow">
      <h1>Get your report card</h1>
      <p className="muted">Enter your registration number.</p>
      <form className="row" onSubmit={submit}>
        <input value={regNo} onChange={(e) => setRegNo(e.target.value)} placeholder="e.g. 21CS001" aria-label="Registration number" autoFocus />
        <button type="submit">View report card</button>
      </form>
    </section>
  );
}
