/**
 * Блок с текущими эфирными программами
 */
function LiveBroadcast({ programs }) {
  return (
    <div className="live-broadcast">
      {programs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
