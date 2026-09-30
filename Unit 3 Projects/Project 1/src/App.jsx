import { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("");

  const click = (value) => {
    if (value === "C") {
      setDisplay("");
    } else if (value === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={display} readOnly />

      <div className="buttons">
        <button onClick={() => click("C")} className="clear">C</button>
        <button onClick={() => click("/")}>÷</button>
        <button onClick={() => click("*")}>×</button>
        <button onClick={() => click("-")}>−</button>

        <button onClick={() => click("7")}>7</button>
        <button onClick={() => click("8")}>8</button>
        <button onClick={() => click("9")}>9</button>
        <button onClick={() => click("+")}>+</button>

        <button onClick={() => click("4")}>4</button>
        <button onClick={() => click("5")}>5</button>
        <button onClick={() => click("6")}>6</button>
        <button onClick={() => click(".")}>.</button>

        <button onClick={() => click("1")}>1</button>
        <button onClick={() => click("2")}>2</button>
        <button onClick={() => click("3")}>3</button>
        <button onClick={() => click("=")} className="equal">=</button>

        <button onClick={() => click("0")} className="zero">0</button>
      </div>
    </div>
  );
}

export default App;