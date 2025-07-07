// app/dashboard/patient/appointments/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import useCitas from "@/hooks/useCitas";
import CitaList from "@/components/citas/CitaList";
import { Container } from "@/components/ui/container";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function PatientAppointmentsPage() {
  // Hooks must always run in the same order, before any early returns
  const { citas, loading, error } = useCitas();
  const [statusFilter, setStatusFilter] = useState<"PROXIMA" | "COMPLETADA" | "CANCELADA">("PROXIMA");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "CONSULTA" | "SEGUIMIENTO" | "EVALUACION">("ALL");

  // Compute filtered list here (hook order preserved)
  const filtered = useMemo(() => {
    return citas.filter((c) => {
      const byStatus = c.estado === statusFilter;
      const byType   = typeFilter === "ALL" || c.tipoDeCita === typeFilter;
      return byStatus && byType;
    });
  }, [citas, statusFilter, typeFilter]);

  // Now it's safe to return early based on loading/error
  if (loading) {
    return <div className="p-4 text-center">Cargando tus citas…</div>;
  }
  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        Error al cargar tus citas.
      </div>
    );
  }

  return (
    <Container className="space-y-6 py-8">
      <h1 className="text-3xl font-bold">Mis citas</h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <Tabs defaultValue={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
          <TabsList>
            <TabsTrigger value="PROXIMA">Próximas</TabsTrigger>
            <TabsTrigger value="COMPLETADA">Completadas</TabsTrigger>
            <TabsTrigger value="CANCELADA">Canceladas</TabsTrigger>
          </TabsList>
        </Tabs>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as any)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tipo de cita" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todas</SelectItem>
            <SelectItem value="CONSULTA">Consulta</SelectItem>
            <SelectItem value="SEGUIMIENTO">Seguimiento</SelectItem>
            <SelectItem value="EVALUACION">Evaluación</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <CitaList citas={filtered} />
    </Container>
  );
}
