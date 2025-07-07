// hooks/useNotasCount.ts
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => {
    if (!res.ok) throw new Error("Error cargando conteo de notas");
    return res.json() as Promise<{ count: number }>;
  });

export default function useNotasCount() {
  const { data, error } = useSWR<{ count: number }>(
    "/api/notas/count",
    fetcher
  );
  return {
    count: data?.count ?? 0,
    loading: !error && !data,
    error,
  };
}
