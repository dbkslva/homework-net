import { useState, useCallback } from "react";
import "./index.css";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default function EditPage() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [element, setElement] = useState("");
  const [value, setValue] = useState("");

  const resetForm = useCallback(() => {
    setEditingId(null);
    setElement("");
    setValue("");
  }, []);

  const fillFormForEdit = useCallback((item) => {
    setEditingId(item.id);
    setElement(item.element);
    setValue(item.value);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const trimmedElement = element.trim();
    const trimmedValue = value.trim();
    if (!trimmedElement || !trimmedValue) return;

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, element: trimmedElement, value: trimmedValue }
            : item
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: generateId(),
          element: trimmedElement,
          value: trimmedValue,
        },
      ]);
    }
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleEdit = (item) => {
    fillFormForEdit(item);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const isEditing = editingId !== null;

  return (
    <div className="app">
      <div className="page edit-page">
        <form className="edit-form" onSubmit={handleSave}>
          <input
            type="text"
            className="edit-form__input"
            placeholder="Элемент"
            value={element}
            onChange={(e) => setElement(e.target.value)}
            required
          />
          <input
            type="text"
            className="edit-form__input"
            placeholder="Значение"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <button type="submit" className="edit-form__submit">
            Save
          </button>
          {isEditing && (
            <button
              type="button"
              className="edit-form__cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </form>

        <ul className="edit-list">
          {items.length === 0 ? (
            <li className="edit-list__empty">Список пуст</li>
          ) : (
            items.map((item) => (
              <li
                key={item.id}
                className={`edit-list__row ${editingId === item.id ? "edit-list__row--editing" : ""}`}
              >
                <span className="edit-list__element">{item.element}</span>
                <span className="edit-list__value">{item.value}</span>
                <div className="edit-list__actions">
                  <button
                    type="button"
                    className="edit-list__btn edit-list__btn--edit"
                    onClick={() => handleEdit(item)}
                  >
                    Редактировать
                  </button>
                  <button
                    type="button"
                    className="edit-list__btn edit-list__btn--delete"
                    onClick={() => handleDelete(item.id)}
                    title="Удалить"
                  >
                    ×
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
