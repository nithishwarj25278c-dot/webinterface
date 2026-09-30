import React from "react";

// Built-in illustrations (no internet needed). To use real photos instead,
// put them in your project's public/ folder and set image: "/hiking.jpg".
const art = (emoji, from, to) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='${from}'/><stop offset='1' stop-color='${to}'/>
      </linearGradient></defs>
      <rect width='400' height='300' fill='url(#g)'/>
      <text x='200' y='185' font-size='110' text-anchor='middle'>${emoji}</text>
    </svg>`
  );

const hobbies = [
  {
    name: "Photography",
    text: "Chasing good light and freezing small moments.",
    image: art("📷", "#a5b4fc", "#6366f1"),
  },
  {
    name: "Hiking",
    text: "Quiet trails, fresh air, and a view at the top.",
    image: art("🥾", "#86efac", "#16a34a"),
  },
  {
    name: "Cooking",
    text: "Trying new recipes and feeding people I like.",
    image: art("🍳", "#fde68a", "#f59e0b"),
  },
  {
    name: "Reading",
    text: "One more chapter, usually well past bedtime.",
    image: art("📚", "#fca5a5", "#e11d48"),
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    padding: "48px 24px",
    background: "#f5f7fa",
    fontFamily: "Georgia, 'Times New Roman', serif",
    color: "#1f2933",
  },
  title: { textAlign: "center", fontSize: 32, margin: "0 0 32px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
    maxWidth: 1000,
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  img: { width: "100%", height: 160, objectFit: "cover", display: "block" },
  body: { padding: 16 },
  name: { margin: "0 0 6px", fontSize: 20 },
  text: { margin: 0, lineHeight: 1.5, color: "#52606d" },
};

function HobbyCard({ name, text, image }) {
  return (
    <div style={styles.card}>
      <img src={image} alt={name} style={styles.img} />
      <div style={styles.body}>
        <h2 style={styles.name}>{name}</h2>
        <p style={styles.text}>{text}</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>My Hobbies</h1>
      <div style={styles.grid}>
        {hobbies.map((h) => (
          <HobbyCard key={h.name} {...h} />
        ))}
      </div>
    </div>
  );
}
