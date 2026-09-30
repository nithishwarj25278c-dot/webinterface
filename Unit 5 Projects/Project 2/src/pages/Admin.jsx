import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudents } from "../StudentContext.jsx";
import { summarize } from "../grades.js";
import { ADMIN_PASSWORD, MAX_STUDENTS } from "../config.js";

// Browser storage can be blocked (private mode, sandboxed previews), so never let it crash the page.
const getFlag = () => {
  try {
    return sessionStorage.getItem("admin") === "1";
  } catch {
    return false;
  }
};
const setFlag = (on) => {
  try {
    if (on) sessionStorage.setItem("admin", "1");
    else sessionStorage.removeItem("admin");
  } catch {}
};

const blankRow = () => ({ subject: "", credits: 3, marks: "" });
const blank = () => ({ regNo: "", name: "", dept: "", semester: "", subjects: [blankRow()] });

export default function Admin() {
  const { students, save, remove } = useStudents();
  const [authed, setAuthed] = useState(getFlag);
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState(null);
  const [isNew, setIsNew] = useState(true);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(null);

  const login = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setFlag(true);
      setAuthed(true);
      setError("");
    } else setError("Wrong password.");
  };

  if (!authed)
    return (
      <section className="narrow">
        <h1>Admin login</h1>
        <form className="row" onSubmit={login}>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" aria-label="Password" autoFocus />
          <button type="submit">Log in</button>
        </form>
        {error && <p className="fail">{error}</p>}
      </section>
    );

  const atLimit = students.length >= MAX_STUDENTS;
  const open = (student, brandNew) => {
    setDraft(student);
    setIsNew(brandNew);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const setField = (k, v) => setDraft({ ...draft, [k]: v });
  const setRow = (i, k, v) => setField("subjects", draft.subjects.map((s, j) => (j === i ? { ...s, [k]: v } : s)));
  const addRow = () => setField("subjects", [...draft.subjects, blankRow()]);
  const delRow = (i) => setField("subjects", draft.subjects.filter((_, j) => j !== i));

  const submit = (e) => {
    e.preventDefault();
    const regNo = draft.regNo.trim().toUpperCase();
    const subjects = draft.subjects
      .filter((s) => s.subject.trim())
      .map((s) => ({ subject: s.subject.trim(), credits: Number(s.credits), marks: Number(s.marks) }));
    if (!regNo || !draft.name.trim()) return setError("Reg no and name are required.");
    if (isNew && students.some((s) => s.regNo === regNo)) return setError("That reg no already exists.");
    if (isNew && atLimit) return setError(`Limit of ${MAX_STUDENTS} students reached.`);
    if (!subjects.length) return setError("Add at least one subject.");
    if (subjects.some((s) => !(s.credits > 0) || !(s.marks >= 0 && s.marks <= 100)))
      return setError("Credits must be above 0 and marks between 0 and 100.");
    save({ ...draft, regNo, name: draft.name.trim(), subjects });
    setDraft(null);
    setError("");
  };

  return (
    <section>
      <div className="bar-row">
        <div>
          <h1>Admin</h1>
          <p className="muted">{students.length} of {MAX_STUDENTS} students</p>
        </div>
        <div className="row">
          <button onClick={() => open(blank(), true)} disabled={atLimit}>Add student</button>
          <button className="link" onClick={() => { setFlag(false); setAuthed(false); setDraft(null); }}>Log out</button>
        </div>
      </div>
      {atLimit && <p className="muted">Limit reached. Delete a student to add another.</p>}

      {draft && (
        <form onSubmit={submit} className="editor">
          <h2>{isNew ? "New student" : `Edit ${draft.regNo}`}</h2>
          <label>Reg no<input value={draft.regNo} disabled={!isNew} onChange={(e) => setField("regNo", e.target.value)} /></label>
          <label>Name<input value={draft.name} onChange={(e) => setField("name", e.target.value)} /></label>
          <label>Department<input value={draft.dept} onChange={(e) => setField("dept", e.target.value)} /></label>
          <label>Semester<input value={draft.semester} onChange={(e) => setField("semester", e.target.value)} /></label>
          <h2>Subjects</h2>
          {draft.subjects.map((s, i) => (
            <div className="subject" key={i}>
              <input placeholder="Subject" aria-label="Subject" value={s.subject} onChange={(e) => setRow(i, "subject", e.target.value)} />
              <input type="number" placeholder="Credits" aria-label="Credits" value={s.credits} onChange={(e) => setRow(i, "credits", e.target.value)} />
              <input type="number" placeholder="Marks" aria-label="Marks" value={s.marks} onChange={(e) => setRow(i, "marks", e.target.value)} />
              <button type="button" className="link danger" onClick={() => delRow(i)}>Remove</button>
            </div>
          ))}
          <button type="button" className="link" onClick={addRow}>Add subject</button>
          {error && <p className="fail">{error}</p>}
          <div className="row">
            <button type="submit">Save student</button>
            <button type="button" className="link" onClick={() => setDraft(null)}>Cancel</button>
          </div>
        </form>
      )}

      <div className="scroll">
        <table>
          <thead>
            <tr><th>Reg no</th><th>Name</th><th>Department</th><th>SGPA</th><th>Result</th><th></th></tr>
          </thead>
          <tbody>
            {students.length === 0 && (
              <tr><td colSpan="6" className="muted">No students yet. Use Add student.</td></tr>
            )}
            {students.map((s) => {
              const r = summarize(s);
              return (
                <tr key={s.regNo}>
                  <td>{s.regNo}</td>
                  <td>{s.name}</td>
                  <td>{s.dept}</td>
                  <td>{r.sgpa.toFixed(2)}</td>
                  <td className={r.passed ? "pass" : "fail"}>{r.passed ? "PASS" : "FAIL"}</td>
                  <td className="actions">
                    {pending === s.regNo ? (
                      <>
                        <button className="link danger" onClick={() => { remove(s.regNo); setPending(null); }}>Confirm delete</button>
                        <button className="link" onClick={() => setPending(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <Link to={`/report/${encodeURIComponent(s.regNo)}`}>View</Link>
                        <button className="link" onClick={() => open(structuredClone(s), false)}>Edit</button>
                        <button className="link danger" onClick={() => setPending(s.regNo)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
