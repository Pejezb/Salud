// hooks/useSolicitudes.ts
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => {
    if (!r.ok) throw new Error("Error cargando solicitudes");
    return r.json();
  });

export interface Solicitud {
  id: number;
  motivo?: string;
  motivoRechazo?: string;
  estado: "PENDIENTE" | "ACEPTADA" | "RECHAZADA";
  fechaSolicitud: string;
  turnoId: number;
  pacienteId: number;
  paciente: {
    usuarioId?: number;
    nombres: string;
    apellidos: string;
    dni: number;
  };
  turno: {
    id: number;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    estado: string;
  };
}

export interface NewSolicitudPayload {
  turnoId: number;
  motivo?: string;
}

export default function useSolicitudes() {
  const { data, error, mutate } = useSWR<Solicitud[]>(
    "/api/solicitudes",
    fetcher
  );

  return {
    solicitudes: data || [],
    loading: !error && !data,
    error,

    /** Crea una nueva solicitud */
    createSolicitud: async (payload: NewSolicitudPayload) => {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al crear solicitud");
      }
      await mutate();
    },

    /** Acepta una solicitud: crea la cita y rechaza las demás */
    acceptSolicitud: async (
      id: number,
      options: {
        tipoDeCita: "CONSULTA" | "SEGUIMIENTO" | "EVALUACION";
        observaciones?: string;
      }
    ) => {
      const res = await fetch(`/api/solicitudes/${id}/accept`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al aceptar solicitud");
      }
      await mutate();
    },

    /** Rechaza una solicitud con motivo */
    rejectSolicitud: async (id: number, motivo: string) => {
      const res = await fetch(`/api/solicitudes/${id}/reject`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ motivo }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al rechazar solicitud");
      }
      await mutate();
    },

    /** Elimina una solicitud */
    deleteSolicitud: async (id: number) => {
      const res = await fetch(`/api/solicitudes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Error al eliminar solicitud");
      }
      await mutate();
    },

    /** Forzar recarga de la lista */
    mutate,
  };
}
