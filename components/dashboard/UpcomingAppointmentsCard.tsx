// components/dashboard/UpcomingAppointmentsCard.tsx
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
import { CalendarCheck } from "lucide-react";
import { format } from "date-fns";
import useCitas from "@/hooks/useCitas";

export default function UpcomingAppointmentsCard() {
  const { citas, loading } = useCitas();

  // Tomamos las 5 próximas citas, ordenadas por fecha+h. inicio
  const upcoming = React.useMemo(
    () =>
      citas
        .filter((c) => c.estado === "PROXIMA")
        .sort((a, b) => {
          const dtA = new Date(`${a.turno.fecha}T${a.turno.horaInicio}`);
          const dtB = new Date(`${b.turno.fecha}T${b.turno.horaInicio}`);
          return dtA.getTime() - dtB.getTime();
        })
        .slice(0, 5),
    [citas]
  );

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <CalendarCheck className="w-5 h-5 text-muted-foreground" />
          <div>
            <CardTitle>Próximas citas</CardTitle>
            <CardDescription>Programadas</CardDescription>
          </div>
        </div>
        <Link href="/dashboard/doctor/appointments">
          <Button variant="outline" size="sm">
            Ver Todas
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-2">
        {loading ? (
          <p className="text-center py-4">Cargando citas…</p>
        ) : upcoming.length === 0 ? (
          <p className="text-center py-4 text-gray-500">
            No hay próximas citas.
          </p>
        ) : (
          <ul className="space-y-2">
            {upcoming.map((c) => (
              <li
                key={c.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">
                    {format(new Date(c.turno.fecha), "dd/MM/yyyy")}{" "}
                    {format(new Date(c.turno.horaInicio), "HH:mm")}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {c.paciente.nombres} {c.paciente.apellidos}
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded capitalize">
                  {c.tipoDeCita.toLowerCase()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
