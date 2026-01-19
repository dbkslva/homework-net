/**
 * Блок с популярными ссылками (Посещаемое)
 */
function PopularLinks({ links }) {
  return (
    <div className="popular-links">
      {links.map((l, i) => (
        <p key={i}>
          <strong>{l.name}</strong> — {l.desc}
        </p>
      ))}
    </div>
  );
}
