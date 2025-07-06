// components/dashboard/paciente/PatientRequestsList.tsx
"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import useSolicitudes from "@/hooks/useSolicitudes";
import { Button } from "@/components/ui/button";

export default function PatientRequestsList() {
  const { solicitudes = [], loading } = useSolicitudes();
  const pendientes = solicitudes.filter((s) => s.estado === "PENDIENTE");

  if (loading) return <p>Cargando solicitudes…</p>;
  if (pendientes.length === 0) return <p>No tienes solicitudes pendientes.</p>;

  return (
    <>
      <ul className="space-y-2">
        {pendientes.slice(0, 5).map((s) => (
          <li
            key={s.id}
            className="bg-gray-100 rounded-lg p-4 flex justify-between items-start"
          >
            <div className="flex flex-col">
              <span className="font-medium">
                {format(new Date(s.turno.fecha), "dd/MM/yyyy")} –{" "}
                {format(new Date(s.turno.horaInicio), "HH:mm")}
              </span>
              <span className="text-sm text-gray-600">{s.motivo ?? "-"}</span>
            </div>
            <span className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-xs font-semibold">
              Pendiente
            </span>
          </li>
        ))}
      </ul>

      {pendientes.length > 5 && (
        <div className="mt-2 text-right">
          <Link href="/dashboard/patient/solicitudes">
            <Button variant="link" size="sm">
              Ver todas ({pendientes.length})
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
