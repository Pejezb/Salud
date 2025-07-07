// components/dashboard/DoctorStats.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Calendar, FileText, ClipboardList } from "lucide-react";

import usePatients from "@/hooks/usePatients";
import useCitas from "@/hooks/useCitas";
import useSolicitudes from "@/hooks/useSolicitudes";
import useNotasCount from "@/hooks/useNotasCount";

export default function DoctorStats() {
  const { patients, loading: lp }      = usePatients();
  const { citas, loading: lc }         = useCitas();
  const { solicitudes, loading: ls }   = useSolicitudes();
  const { count: notasCount, loading: ln } = useNotasCount();

  // Si está cargando, ponemos null para que muestre “…”
  const totalPacientes = lp ? null : patients.length;
  const totalCitas    = lc ? null : citas.length;
  const totalNotas    = ln ? null : notasCount;
  const totalSolic    = ls ? null : solicitudes.filter(s => s.estado === "PENDIENTE").length;

  const renderValue = (v: number | null) => (v === null ? "…" : v);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Pacientes */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{renderValue(totalPacientes)}</div>
        </CardContent>
      </Card>

      {/* Citas Programadas */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Citas Programadas</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{renderValue(totalCitas)}</div>
        </CardContent>
      </Card>

      {/* Notas Clínicas */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Notas Clínicas</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{renderValue(totalNotas)}</div>
        </CardContent>
      </Card>

      {/* Solicitudes Pendientes */}
      <Card>
        <CardHeader className="flex justify-between pb-2">
          <CardTitle className="text-sm font-medium">Solicitudes Pendientes</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{renderValue(totalSolic)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
