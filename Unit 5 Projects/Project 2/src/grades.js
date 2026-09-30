export const PASS_MARK = 40;

const scale = [
  [90, "O", 10],
  [80, "A+", 9],
  [70, "A", 8],
  [60, "B+", 7],
  [50, "B", 6],
  [40, "C", 5],
];

export function gradeOf(marks) {
  for (const [min, grade, points] of scale) if (marks >= min) return { grade, points };
  return { grade: "F", points: 0 };
}

export function summarize(student) {
  const rows = student.subjects.map((s) => ({ ...s, ...gradeOf(s.marks) }));
  const credits = rows.reduce((a, r) => a + r.credits, 0);
  const sgpa = credits ? rows.reduce((a, r) => a + r.points * r.credits, 0) / credits : 0;
  const total = rows.reduce((a, r) => a + r.marks, 0);
  const percentage = rows.length ? total / rows.length : 0;
  const passed = rows.length > 0 && rows.every((r) => r.marks >= PASS_MARK);
  return { rows, credits, sgpa, total, percentage, passed };
}
