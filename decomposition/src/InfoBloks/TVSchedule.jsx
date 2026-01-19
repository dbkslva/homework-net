/**
 * Блок с телепрограммой
 */
function TVSchedule({ shows }) {
  return (
    <div className="tv-schedule">
      {shows.map((show, i) => (
        <p key={i}>
          {show.time} {show.channel} {show.name}
        </p>
      ))}
    </div>
  );
}
