// hooks/useNotas.ts
"use client";

import useSWR from "swr";

export interface NotaResumen {
  id: number;
  fecha: string;
  citaId: number;
}

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then(async (res) => {
    if (!res.ok) throw new Error("Error cargando notas");
    return res.json();
  });

/**
 * Hook para obtener todas las notas clínicas del doctor
 */
export default function useNotas() {
  const { data, error } = useSWR<NotaResumen[]>("/api/doctor/notas", fetcher);

  return {
    notas: data || [],
    loading: !error && !data,
    error,
  };
}
