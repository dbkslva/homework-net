export default function Note({ note, onRemove }) {
  return (
    <div className="note">
      <span>{note.content}</span>
      <button className="remove" onClick={() => onRemove(note.id)}>
        ✕
      </button>
    </div>
  );
}
