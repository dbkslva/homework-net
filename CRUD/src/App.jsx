import { useEffect, useState } from "react";
import Note from "./Note.jsx";
import "./App.css";

const URL = "http://localhost:7070/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

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

  // CREATE
  const addNote = async () => {
    if (!content.trim()) return;

    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        content,
      }),
    });

    setContent("");
    loadNotes(); // GET
  };

  // DELETE
  const removeNote = async (id) => {
    await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });

    loadNotes(); // GET
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
          <Note key={note.id} note={note} onRemove={removeNote} />
        ))}
      </div>
    </div>
  );
}
