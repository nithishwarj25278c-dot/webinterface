import { Link, useParams } from "react-router-dom";
import { useStudents } from "../StudentContext.jsx";
import { summarize } from "../grades.js";
import { COLLEGE_NAME } from "../config.js";

export default function ReportCard() {
  const { regNo } = useParams();
  const { find } = useStudents();
  const student = find(regNo);

  if (!student)
    return (
      <section className="narrow">
        <h1>No record found</h1>
        <p className="muted">There is no student with reg no {regNo}. Check the number and try again.</p>
        <Link to="/">Back</Link>
      </section>
    );

  const r = summarize(student);

  return (
    <section>
      <div className="sheet">
        <h1 className="center">{COLLEGE_NAME}</h1>
        <p className="center muted">Semester {student.semester} report card</p>
        <dl className="details">
          <div><dt>Name</dt><dd>{student.name}</dd></div>
          <div><dt>Reg no</dt><dd>{student.regNo}</dd></div>
          <div><dt>Department</dt><dd>{student.dept}</dd></div>
        </dl>
        <table>
          <thead>
            <tr><th>Subject</th><th>Credits</th><th>Marks</th><th>Grade</th><th>Points</th></tr>
          </thead>
          <tbody>
            {r.rows.map((s, i) => (
              <tr key={i} className={s.grade === "F" ? "fail" : ""}>
                <td>{s.subject}</td><td>{s.credits}</td><td>{s.marks}</td><td>{s.grade}</td><td>{s.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="summary">
          <div><span>Total credits</span><b>{r.credits}</b></div>
          <div><span>Percentage</span><b>{r.percentage.toFixed(1)}%</b></div>
          <div><span>SGPA</span><b>{r.sgpa.toFixed(2)}</b></div>
          <div><span>Result</span><b className={r.passed ? "pass" : "fail"}>{r.passed ? "PASS" : "FAIL"}</b></div>
        </div>
        <p className="muted small">Generated on {new Date().toLocaleDateString()}</p>
      </div>
      <div className="row no-print">
        <button onClick={() => window.print()}>Print / save as PDF</button>
        <Link to="/">Look up another</Link>
      </div>
    </section>
  );
}
