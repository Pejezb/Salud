// components/dashboard/paciente/PatientAppointmentsList.tsx
"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import useCitas from "@/hooks/useCitas";
import { Button } from "@/components/ui/button";

export default function PatientAppointmentsList() {
  const { citas = [], loading } = useCitas();
  const proximas = citas.filter((c) => c.estado === "PROXIMA");

  if (loading) return <p>Cargando citas…</p>;
  if (proximas.length === 0) return <p>No tienes citas próximas.</p>;

  return (
    <>
      <ul className="space-y-2">
        {proximas.slice(0, 5).map((c) => (
          <li
            key={c.id}
            className="bg-gray-100 rounded-lg p-4 flex justify-between items-start"
          >
            <div className="flex flex-col">
              <span className="font-medium">
                {format(new Date(c.turno.fecha), "dd/MM/yyyy")}{" "}
                {format(new Date(c.turno.horaInicio), "HH:mm")}
              </span>
              <span className="text-sm text-gray-600">
                {c.tipoDeCita.toLowerCase()}
              </span>
            </div>
            <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold">
              {c.tipoDeCita === "CONSULTA" ? "Consulta" : "Seguimiento"}
            </span>
          </li>
        ))}
      </ul>

      {proximas.length > 5 && (
        <div className="mt-2 text-right">
          <Link href="/dashboard/patient/appointments">
            <Button variant="link" size="sm">
              Ver todas ({proximas.length})
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
