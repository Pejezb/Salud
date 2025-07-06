// components/solicitudes/SolicitudesList.tsx
"use client";

import React from "react";
import { format } from "date-fns";
import useSolicitudes, { Solicitud } from "@/hooks/useSolicitudes";

interface SolicitudesListProps {
  fechaExacta: string;
  estado: string;      // "ALL" | "PENDIENTE" | "ACEPTADA" | "RECHAZADA"
  searchText: string;
}

export default function SolicitudesList({
  fechaExacta,
  estado,
  searchText,
}: SolicitudesListProps) {
  const { solicitudes, loading } = useSolicitudes();

  const filtered = React.useMemo(() => {
    return solicitudes
      // 1) Filtrar por estado
      .filter(s => (estado === "ALL" ? true : s.estado === estado))

      // 2) Fecha exacta de turno si se especificó
      .filter(s => {
        if (!fechaExacta) return true;
        return format(new Date(s.turno.fecha), "yyyy-MM-dd") === fechaExacta;
      })

      // 3) Texto libre (paciente, motivo, id)
      .filter(s => {
        if (!searchText) return true;
        const txt = searchText.toLowerCase();
        const paciente = `${s.paciente.nombres} ${s.paciente.apellidos}`.toLowerCase();
        return (
          paciente.includes(txt) ||
          (s.motivo?.toLowerCase().includes(txt) ?? false) ||
          String(s.id).includes(txt)
        );
      })

      // 4) Ordenar por proximidad (fecha + hora ascendente)
      .sort((a, b) => {
        const dtA = new Date(`${a.turno.fecha}T${a.turno.horaInicio}`).getTime();
        const dtB = new Date(`${b.turno.fecha}T${b.turno.horaInicio}`).getTime();
        return dtA - dtB;
      });
  }, [solicitudes, fechaExacta, estado, searchText]);

  if (loading) {
    return <p className="text-center py-4">Cargando solicitudes…</p>;
  }
  if (!loading && filtered.length === 0) {
    return (
      <p className="text-center py-4 text-gray-500">
        No hay solicitudes que coincidan.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filtered.map(s => (
        <div
          key={s.id}
          className="w-full p-4 bg-white rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold mb-1 text-center">
            Solicitud de cita #{s.id}
          </h2>
          <p className="text-center text-sm text-gray-600 mb-2">
            {format(new Date(s.turno.fecha), "dd/MM/yyyy")}{" "}
            {format(new Date(s.turno.horaInicio), "HH:mm")}
          </p>
          <p className="text-center font-medium mb-1">
            {s.paciente.nombres} {s.paciente.apellidos}
          </p>
          {s.motivo && (
            <p className="text-center text-gray-700 mb-1">
              Motivo: {s.motivo}
            </p>
          )}
          {s.estado === "RECHAZADA" && s.motivoRechazo && (
            <p className="text-center text-red-600 mb-1">
              Motivo de rechazo: {s.motivoRechazo}
            </p>
          )}
          <div className="flex justify-center">
            <span
              className={[
                "inline-block px-2 py-0.5 text-xs font-semibold rounded",
                s.estado === "PENDIENTE"
                  ? "bg-yellow-100 text-yellow-800"
                  : s.estado === "ACEPTADA"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800",
              ].join(" ")}
            >
              {s.estado.toLowerCase()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
