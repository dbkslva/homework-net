import { useEffect, useState } from "react";

export default function Clock({ name, offset, onRemove }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;

      const localTime = new Date(utc + offset * 60 * 60 * 1000);

      setTime(localTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [offset]);

  const format = (date) =>
    date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="clock">
      <strong>{name}</strong>
      <div className="time">{format(time)}</div>
      <button onClick={onRemove}>✕</button>
    </div>
  );
}
