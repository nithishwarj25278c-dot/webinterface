import { useState } from "react";
import "./App.css";

function App() {
  const students = [
    "Arun Kumar",
    "Rahul",
    "Priya",
    "Karthik",
    "Divya"
  ];

  const [attendance, setAttendance] = useState({});

  const markAttendance = (name, status) => {
    setAttendance({
      ...attendance,
      [name]: status
    });
  };

  const present = Object.values(attendance).filter(
    (status) => status === "Present"
  ).length;

  const absent = Object.values(attendance).filter(
    (status) => status === "Absent"
  ).length;

  return (
    <div className="container">
      <h1>Student Attendance Marker</h1>

      {students.map((student, index) => (
        <div className="student" key={index}>
          <span>{student}</span>

          <button
            className="present"
            onClick={() => markAttendance(student, "Present")}
          >
            Present
          </button>

          <button
            className="absent"
            onClick={() => markAttendance(student, "Absent")}
          >
            Absent
          </button>

          <span className="status">
            {attendance[student] || "Not Marked"}
          </span>
        </div>
      ))}

      <div className="total">
        <h2>Attendance Summary</h2>
        <p>Total Students: {students.length}</p>
        <p>Total Present: {present}</p>
        <p>Total Absent: {absent}</p>
      </div>
    </div>
  );
}

export default App;