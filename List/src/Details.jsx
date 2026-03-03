import { useEffect, useState } from "react";

export default function Details({ info }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const id = info?.id;

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();
    let cancelled = false;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- loading state before async fetch is intentional
    setLoading(true);
    setDetails(null);

    fetch(
      `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${id}.json`,
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setDetails(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError" && !cancelled) {
          setLoading(false);
          setDetails(null);
        }
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id]);

  if (loading) return <div className="details-panel">Loading...</div>;
  if (!details) return null;

  return (
    <div className="details-panel">
      <img src={details.avatar} alt={details.name} />
      <h3>{details.name}</h3>
      <p>City: {details.details.city}</p>
      <p>Company: {details.details.company}</p>
      <p>Position: {details.details.position}</p>
    </div>
  );
}
