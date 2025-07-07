// components/doctor-notas/NotasList.tsx
import React from "react";
import CitaNotaCard from "./CitaNotaCard";
import type { Cita as CitaType } from "@/hooks/useCitas";
import type { NotaAPI as NotaType } from "@/hooks/useNota";

interface NotasListProps {
  items: { cita: CitaType; nota?: NotaType }[];
  onGenerate: (citaId: number) => void;
  onEdit: (citaId: number) => void;
}

export default function NotasList({ items, onGenerate, onEdit }: NotasListProps) {
  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        No hay citas completadas para mostrar.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(({ cita, nota }) => (
        <CitaNotaCard
          key={cita.id}
          cita={cita}
          nota={nota}
          onGenerate={onGenerate}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
