// hooks/usePatientCitas.ts
import useSWR from "swr";

export interface Turno { fecha: string; horaInicio: string; horaFin: string; }
export interface CitaAPI {
  id: number;
  tipoDeCita: "CONSULTA" | "SEGUIMIENTO" | "EVALUACION";
  turno: Turno;
}

async function fetcher(url: string): Promise<CitaAPI[]> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error("Error cargando citas");
  return res.json();
}

export default function usePatientCitas(pacienteId?: number) {
  // La clave es `/api/patient/citas/${pacienteId}` o null (que hace que SWR no dispare fetch)
  const key = pacienteId
    ? `/api/patient/citas/${pacienteId}`
    : null;

  const { data, error } = useSWR<CitaAPI[]>(key, fetcher);

  return {
    citas: data,
    loading: Boolean(key && !data && !error),
    error,
  };
}
