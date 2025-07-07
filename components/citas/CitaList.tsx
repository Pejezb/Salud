// components/citas/CitaList.tsx
import React from "react";
import CitaCard from "./CitaCard";
import type { Cita as CitaType } from "@/hooks/useCitas";

interface Props {
  citas: CitaType[];
}

export default function CitaList({ citas }: Props) {
  if (citas.length === 0) {
    return (
      <p className="text-center text-gray-400 italic">
        No hay citas para mostrar.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {citas.map((cita) => (
        <CitaCard key={cita.id} cita={cita} />
      ))}
    </div>
  );
}
