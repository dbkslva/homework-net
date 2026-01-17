import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hex, setHex] = useState("#000000");
  const [result, setResult] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (hex.length !== 7) {
      setResult("");
      return;
    }
    const isValidHex = /^#([0-9A-F]{6})$/i.test(hex);

    if (!isValidHex) {
      setResult("Ошибка");
      return;
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    setResult(`rgb(${r}, ${g}, ${b})`);
    setBgColor(hex);
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          placeholder="#RRGGBB"
          maxLength={7}
        />
      </form>
      <div className="result">{result}</div>
    </div>
  );
}
export default App;
