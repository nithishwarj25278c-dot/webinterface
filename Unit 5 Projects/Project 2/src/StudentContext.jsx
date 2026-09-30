import { createContext, useContext, useEffect, useState } from "react";

const KEY = "report-card-students-v3";
const Ctx = createContext(null);

const SUBJECTS = {
  "Computer Science": [["Data Structures", 4], ["Operating Systems", 4], ["Database Systems", 3], ["Discrete Mathematics", 3], ["Software Engineering", 3]],
  Electronics: [["Analog Circuits", 4], ["Digital Signal Processing", 4], ["Microprocessors", 3], ["Control Systems", 3], ["Communication Theory", 3]],
  Mechanical: [["Thermodynamics", 4], ["Fluid Mechanics", 4], ["Machine Design", 3], ["Manufacturing Processes", 3], ["Engineering Materials", 3]],
};

const raw = [
  ["21CS001", "Jenalia Rachel", "Computer Science", [92, 88, 95, 84, 90]],
  ["21CS002", "Arun Kumar", "Computer Science", [78, 72, 81, 66, 74]],
  ["21CS003", "Priya Dharshini", "Computer Science", [85, 91, 79, 88, 83]],
  ["21CS004", "Karthik Subramanian", "Computer Science", [64, 58, 71, 52, 60]],
  ["21EC001", "Meenakshi Sundaram", "Electronics", [89, 76, 84, 80, 87]],
  ["21EC002", "Kavya Selvam", "Electronics", [72, 68, 75, 61, 70]],
  ["21EC003", "Sathish Murugan", "Electronics", [55, 49, 62, 45, 58]],
  ["21ME001", "Ilakkiya Balan", "Mechanical", [81, 77, 69, 73, 79]],
  ["21ME002", "Vignesh Palani", "Mechanical", [38, 55, 62, 47, 51]],
  ["21ME003", "Tamilarasi Velu", "Mechanical", [94, 90, 87, 92, 96]],
];

const seed = raw.map(([regNo, name, dept, marks]) => ({
  regNo,
  name,
  dept,
  semester: "4",
  subjects: SUBJECTS[dept].map(([subject, credits], i) => ({ subject, credits, marks: marks[i] })),
}));

function load() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data) ? data : seed;
  } catch {
    return seed;
  }
}

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(students));
    } catch {}
  }, [students]);

  const find = (regNo) => students.find((s) => s.regNo.toLowerCase() === String(regNo).trim().toLowerCase());
  const save = (student) =>
    setStudents((list) =>
      list.some((s) => s.regNo === student.regNo)
        ? list.map((s) => (s.regNo === student.regNo ? student : s))
        : [...list, student]
    );
  const remove = (regNo) => setStudents((list) => list.filter((s) => s.regNo !== regNo));

  return <Ctx.Provider value={{ students, find, save, remove }}>{children}</Ctx.Provider>;
}

export const useStudents = () => useContext(Ctx);
