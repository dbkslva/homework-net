import { useEffect, useState } from "react";
import Note from "./Note.jsx";
import "./App.css";

const URL = "http://localhost:7070/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [tick, setTick] = useState(0); // общий таймер

  // READ
  const loadNotes = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setNotes(data);
  };

  // первоначальная загрузка
  useEffect(() => {
    loadNotes();
  }, []);

  // единый таймер
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // CREATE
  const addNote = async () => {
    if (!content.trim()) return;

    await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 0,
        content,
      }),
    });

    setContent("");
    loadNotes();
  };

  // DELETE
  const removeNote = async (id) => {
    await fetch(`${URL}/${id}`, { method: "DELETE" });
    loadNotes();
  };

  return (
    <div className="app">
      <h2>Notes</h2>

      <div className="form">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введите заметку"
        />
        <button onClick={addNote}>Добавить</button>
        <button onClick={loadNotes}>🔄</button>
      </div>

      <div className="notes">
        {notes.map((note) => (
          <Note key={note.id} note={note} tick={tick} onRemove={removeNote} />
        ))}
      </div>
    </div>
  );
}
