export default function Note({ note, tick, onRemove }) {
  return (
    <div className="note">
      <span>{note.content}</span>
      <small> ⏱ {tick}</small>
      <button className="remove" onClick={() => onRemove(note.id)}>
        ✕
      </button>
    </div>
  );
}
