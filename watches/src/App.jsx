import { useState } from "react";
import Clock from "./Clock";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [offset, setOffset] = useState("");
  const [clocks, setClocks] = useState([]);

  const addClock = () => {
    if (!name || offset === "") return;

    setClocks([
      ...clocks,
      {
        id: Date.now(),
        name,
        offset: Number(offset),
      },
    ]);

    setName("");
    setOffset("");
  };

  const removeClock = (id) => {
    setClocks(clocks.filter((c) => c.id !== id));
  };

  return (
    <div className="app">
      <h2>Мировые часы</h2>

      <input
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Смещение от UTC"
        value={offset}
        onChange={(e) => setOffset(e.target.value)}
      />

      <button onClick={addClock}>Добавить</button>

      <div className="list">
        {clocks.map((clock) => (
          <Clock
            key={clock.id}
            name={clock.name}
            offset={clock.offset}
            onRemove={() => removeClock(clock.id)}
          />
        ))}
      </div>
    </div>
  );
}
