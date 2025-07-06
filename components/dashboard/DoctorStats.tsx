// components/dashboard/DoctorStats.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar, FileText, ClipboardList } from "lucide-react";
import usePatients from "@/hooks/usePatients";
import useCitas from "@/hooks/useCitas";
import useSolicitudes from "@/hooks/useSolicitudes";
// import useHistorias from "@/hooks/useHistorias"; // opcional

export default function DoctorStats() {
  const { patients, loading: loadingPatients } = usePatients();
  const { citas, loading: loadingCitas } = useCitas();
  const { solicitudes, loading: loadingSolicitudes } = useSolicitudes();
  // const { historias, loading: loadingHistorias } = useHistorias();

  const totalPacientes = loadingPatients ? null : patients.length;
  const totalCitas = loadingCitas ? null : citas.length;
  const totalHistorias = null; // placeholder si no implementas historias aún
  const totalSolicitudes = loadingSolicitudes
    ? null
    : solicitudes.filter((s) => s.estado === "PENDIENTE").length;

  const renderValue = (value: number | null) =>
    value === null ? "…" : value;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Pacientes */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {renderValue(totalPacientes!)}
          </div>
        </CardContent>
      </Card>

      {/* Citas Programadas */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Citas Programadas</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {renderValue(totalCitas!)}
          </div>
        </CardContent>
      </Card>

      {/* Historias Clínicas */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Historias Clínicas</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            –{/* Cambia por renderValue(totalHistorias!) si implementas el hook */}
          </div>
        </CardContent>
      </Card>

      {/* Solicitudes Pendientes */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Solicitudes Pendientes</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {renderValue(totalSolicitudes!)}
          </div>
        </CardContent>
      </Card>
    </div>
);
}
