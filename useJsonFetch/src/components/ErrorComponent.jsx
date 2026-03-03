import { useJsonFetch } from "../hooks/useJsonFetch";

export default function ErrorComponent() {
  const [data, loading, error] = useJsonFetch("http://localhost:7070/error");

  return (
    <div className="demo-card">
      <h5>GET /error — 500 ошибка</h5>
      {loading && <p>Загрузка...</p>}
      {error && !loading && (
        <p className="text-danger">Ошибка: {error.message}</p>
      )}
      {data && !loading && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
