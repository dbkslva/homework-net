import { useJsonFetch } from "../hooks/useJsonFetch";

export default function DataComponent() {
  const [data, loading, error] = useJsonFetch("http://localhost:7070/data");

  return (
    <div className="demo-card">
      <h5>GET /data — успешное получение</h5>
      {loading && <p>Загрузка...</p>}
      {error && <p className="text-danger">Ошибка: {error.message}</p>}
      {data && !loading && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
