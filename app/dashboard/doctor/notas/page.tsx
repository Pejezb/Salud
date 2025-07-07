// app/dashboard/doctor/notas/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import useCitas, { Cita as CitaType } from "@/hooks/useCitas";
import type { NotaAPI as NotaType } from "@/hooks/useNota";
import NotasFilters, { NotasFiltersProps } from "@/components/doctor-notas/NotasFilters";
import NotasList from "@/components/doctor-notas/NotasList";
import { Container } from "@/components/ui/container";

export default function DoctorNotasPage() {
  const router = useRouter();
  const { citas, loading, error } = useCitas();  // Hook original, no cambios

  const [filters, setFilters] = useState<Parameters<NotasFiltersProps["onChange"]>[0]>({
    searchText: "",
  });

  // Aplica estado COMPLETADA y filtros de búsqueda, fecha y tipo
  const filteredCitas = useMemo(() => {
    return citas
      .filter((c) => c.estado === "COMPLETADA")
      .filter((c) => {
        const nombre = `${c.paciente.nombres} ${c.paciente.apellidos}`.toLowerCase();
        const text = filters.searchText.toLowerCase();

        if (text && !nombre.includes(text) && !c.tipoDeCita.toLowerCase().includes(text)) {
          return false;
        }
        if (filters.date && c.turno.fecha !== filters.date) {
          return false;
        }
        if (filters.tipoRegistro && c.tipoDeCita !== filters.tipoRegistro) {
          return false;
        }
        return true;
      });
  }, [citas, filters]);

  // Construye items con shape { cita, nota? }
  const items: { cita: CitaType; nota?: NotaType }[] = filteredCitas.map((c) => ({
    cita: c,
    nota: undefined, // sin nota cargada aún
  }));

  const handleGenerate = (citaId: number) => {
    router.push(`/dashboard/doctor/notas/${citaId}/new`);
  };

  const handleEdit = (citaId: number) => {
    router.push(`/dashboard/doctor/notas/${citaId}`);
  };

  if (loading) {
    return <div className="p-4 text-center">Cargando citas completadas…</div>;
  }
  if (error) {
    return <div className="p-4 text-center text-red-500">Error al cargar citas.</div>;
  }

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-6">Gestionar Notas Clínicas</h1>
      <NotasFilters onChange={setFilters} />
      <NotasList items={items} onGenerate={handleGenerate} onEdit={handleEdit} />
    </Container>
  );
}
