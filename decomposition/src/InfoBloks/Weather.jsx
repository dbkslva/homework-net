/**
 * Блок с текущей погодой
 */
function Weather({ temp, morning, day }) {
  return (
    <div className="weather">
      <p>{temp}°</p>
      <p>
        Утром {morning}, днём {day}
      </p>
    </div>
  );
}
