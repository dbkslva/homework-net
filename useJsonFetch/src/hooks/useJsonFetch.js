import { useState, useEffect } from "react";

/**
 * Кастомный хук для HTTP-запросов с fetch.
 * @param {string} url - URL для запроса
 * @param {RequestInit} [opts] - Опции для fetch (method, headers и т.д.)
 * @returns {[any, boolean, Error|null]} [data, loading, error]
 */
export function useJsonFetch(url, opts = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(url, opts);

        if (cancelled) return;

        if (!response.ok) {
          const text = await response.text();
          let errorData;
          try {
            errorData = text ? JSON.parse(text) : null;
          } catch {
            errorData = text || response.statusText;
          }
          throw new Error(
            typeof errorData === "object" && errorData?.status
              ? errorData.status
              : `HTTP ${response.status}: ${response.statusText}`
          );
        }

        const text = await response.text();
        if (cancelled) return;

        if (!text) {
          setData(null);
          return;
        }

        try {
          const parsed = JSON.parse(text);
          setData(parsed);
        } catch {
          throw new Error("Invalid JSON response");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return [data, loading, error];
}
