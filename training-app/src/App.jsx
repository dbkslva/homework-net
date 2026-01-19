import { useState } from "react";
import "./App.css";

function App() {
  const [training, setTraining] = useState([]);
  const [date, setDate] = useState("");
  const [km, setKm] = useState("");
  const [editingDate, setEditingDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !km) return;

    const kmNumber = parseFloat(km);

    setTraining((prev) => {
      let updated;

      if (editingDate) {
        prev = prev.filter((item) => item.date === date);
        setEditingDate(null);
      }
      const existing = prev.find((item) => item.date === date);

      if (existing) {
        updated = prev.map((item) =>
          item.date === date ? { ...item, km: item.km + kmNumber } : item
        );
      } else {
        updated = [...prev, { date, km: kmNumber }];
      }
      return updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    setDate("");
    setKm("");
  };
  const handleDelete = (dateToDelete) => {
    setTraining((prevTraining) =>
      prevTraining.filter((item) => item.date !== dateToDelete)
    );
  };

  const handleEdit = (item) => {
    setDate(item.date);

    setKm(item.km);
    setEditingDate(item.date);
  };
  return (
    <div className="app">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Дата (ДД.ММ.ГГГГ)</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Пройдено км</label>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(e.target.value)}
          />
        </div>
        <button className="button" type="submit">
          OK
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {training.map((item) => (
            <tr key={item.date}>
              <td>{item.date}</td>
              <td>{item.km}</td>
              <td>
                <button className="button" onClick={() => handleEdit(item)}>
                  ✎
                </button>
                <button
                  className="button"
                  onClick={() => handleDelete(item.date)}
                >
                  ✘
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
