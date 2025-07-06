// components/dashboard/RecentSolicitudes.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import useSolicitudes from "@/hooks/useSolicitudes";

export default function RecentSolicitudes() {
  const { solicitudes, loading } = useSolicitudes();

  const pending = React.useMemo(
    () =>
      solicitudes
        .filter((s) => s.estado === "PENDIENTE")
        .sort(
          (a, b) =>
            new Date(b.fechaSolicitud).getTime() -
            new Date(a.fechaSolicitud).getTime()
        )
        .slice(0, 5),
    [solicitudes]
  );

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Solicitudes pendientes</CardTitle>
          <CardDescription>Últimas solicitudes de cita</CardDescription>
        </div>
        <Link href="/dashboard/doctor/solicitudes">
          <Button variant="outline" size="sm">
            Ver Todas
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-2">
        {loading ? (
          <p className="text-center py-4">Cargando solicitudes…</p>
        ) : pending.length === 0 ? (
          <p className="text-center py-4 text-gray-500">
            No hay solicitudes pendientes.
          </p>
        ) : (
          <ul className="space-y-2">
            {pending.map((s) => (
              <li
                key={s.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <div className="space-y-1">
                  {/* Sólo fecha y hora del turno */}
                  <p className="text-sm font-medium">
                    {format(new Date(s.turno.fecha), "dd/MM/yyyy")}{" "}
                    {format(new Date(s.turno.horaInicio), "HH:mm")}
                  </p>

                  {/* Nombre del paciente */}
                  <p className="text-xs text-gray-600">
                    {s.paciente.nombres} {s.paciente.apellidos}
                  </p>

                  {/* Motivo */}
                  {s.motivo && (
                    <p className="text-xs text-gray-500">{s.motivo}</p>
                  )}
                </div>

                {/* Estado */}
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded uppercase">
                  Pendiente
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
