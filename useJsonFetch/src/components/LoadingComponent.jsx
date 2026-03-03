import { useJsonFetch } from "../hooks/useJsonFetch";

export default function LoadingComponent() {
  const [data, loading, error] = useJsonFetch("http://localhost:7070/loading");

  return (
    <div className="demo-card">
      <h5>GET /loading — индикатор загрузки (5 сек)</h5>
      {loading && <p>Загрузка...</p>}
      {error && !loading && (
        <p className="text-danger">Ошибка: {error.message}</p>
      )}
      {data && !loading && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
