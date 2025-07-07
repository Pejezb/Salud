// hooks/usePatientNota.ts
import useSWR from "swr";
import type { NotaAPI } from "@/hooks/useNota"; // tu definición original

async function fetcher(url: string): Promise<NotaAPI> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error("Error cargando nota");
  return res.json();
}

export default function usePatientNota(citaId?: number) {
  const key = citaId ? `/api/citas/${citaId}/nota` : null;
  const { data, error } = useSWR<NotaAPI>(key, fetcher);
  return {
    nota: data,
    loading: !!key && !data && !error,
    error,
  };
}
