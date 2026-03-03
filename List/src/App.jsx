import { useState } from "react";
import List from "./List";
import Details from "./Details";
import "./App.css";

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", gap: "40px" }}>
      <List onSelect={setSelected} />
      {selected && <Details info={selected} />}
    </div>
  );
}
