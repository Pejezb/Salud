// components/dashboard/doctor/DoctorRequestsList.tsx
"use client";

import React from "react";
import useSolicitudes, { Solicitud } from "@/hooks/useSolicitudes";
import DoctorSolicitudCard from "./DoctorSolicitudCard";

export default function DoctorRequestsList() {
  const { solicitudes = [], loading, error, mutate } = useSolicitudes();

  // Filtra solo pendientes, clona el array y ordena por id ascendente
  const pendingSorted = React.useMemo<Solicitud[]>(() => {
    return solicitudes
      .filter((s) => s.estado === "PENDIENTE")
      .slice() // clonar antes de ordenar
      .sort((a, b) => a.id - b.id);
  }, [solicitudes]);

  if (loading) {
    return <p className="text-center py-4">Cargando solicitudes…</p>;
  }

  if (error) {
    return (
      <p className="text-red-500 text-center py-4">
        Error al cargar solicitudes.
      </p>
    );
  }

  if (pendingSorted.length === 0) {
    return <p className="text-center py-4">No hay solicitudes pendientes.</p>;
  }

  return (
    <div className="space-y-4">
      {pendingSorted.map((s) => (
        <DoctorSolicitudCard
          key={s.id}
          solicitud={s}
          onAccepted={mutate}
          onRejected={mutate}
        />
      ))}
    </div>
  );
}
