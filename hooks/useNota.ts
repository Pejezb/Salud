// hooks/useNota.ts
import useSWR, { mutate } from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Error cargando nota");
    }
    return res.json();
  });

export interface NotaAPI {
  id: number;
  contenido: string;
  fecha: string;   // <— este campo debe coincidir con tu columna “fecha” en la BD
  cita: {
    id: number;
    tipoDeCita: "CONSULTA" | "SEGUIMIENTO" | "EVALUACION";
    turno: {
      fecha: string;
      horaInicio: string;
      horaFin: string;
    };
    paciente: {
      nombres: string;
      apellidos: string;
    };
  };
}

export default function useNota(citaId: number) {
  const key = `/api/citas/${citaId}/nota`;
  const { data, error } = useSWR<NotaAPI | null>(key, fetcher);

  // Solo cargando mientras data === undefined
  const loading = error == null && data === undefined;

  async function createNota(payload: { contenido: string }) {
    const res = await fetch(key, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    await mutate(key);
  }

  async function updateNota(payload: { contenido: string }) {
    if (!data) throw new Error("Nota inexistente");
    const res = await fetch(`/api/nota/${data.id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    await mutate(key);
  }

  async function deleteNota() {
    if (!data) throw new Error("Nota inexistente");
    const res = await fetch(`/api/nota/${data.id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error(await res.text());
    // Limpia el cache y marca data como null
    await mutate(key, null, false);
  }

  return {
    nota: data,    // undefined = cargando, null = no existe, NotaAPI = existe
    loading,
    error,
    createNota,
    updateNota,
    deleteNota,
  };
}
