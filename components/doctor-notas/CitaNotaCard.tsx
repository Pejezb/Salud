// components/doctor-notas/CitaNotaCard.tsx
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// Usamos los tipos reales de tus hooks
import type { Cita as CitaType } from "@/hooks/useCitas";
import type { NotaAPI as NotaType } from "@/hooks/useNota";

interface Props {
  cita: CitaType;
  nota?: NotaType;
  onGenerate: (citaId: number) => void;
  onEdit: (citaId: number) => void;
}

export default function CitaNotaCard({
  cita,
  nota,
  onGenerate,
  onEdit,
}: Props) {
  const pacienteNombre = `${cita.paciente.nombres} ${cita.paciente.apellidos}`;
  const fecha = format(new Date(cita.turno.fecha), "dd/MM/yyyy");
  const horaInicio = format(new Date(cita.turno.horaInicio), "HH:mm");
  const horaFin = format(new Date(cita.turno.horaFin), "HH:mm");
  const tipo = cita.tipoDeCita.toLowerCase();

  return (
    <Card className="rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
      <CardHeader className="p-4 bg-gray-50">
        {/* Ahora incluimos el número de cita */}
        <h2 className="text-lg font-semibold">
          Cita #{cita.id} — {pacienteNombre}
        </h2>
        <p className="text-sm text-gray-600">
          {fecha} • {horaInicio} – {horaFin} ({tipo})
        </p>
      </CardHeader>
      
      <CardContent className="p-4 space-y-2">
        <p>
          <span className="font-medium">Tipo de cita:</span>{" "}
          {tipo}
        </p>
        {!nota ? (
          <Button
            variant="outline"
            onClick={() => onGenerate(cita.id)}
            className="mt-2"
          >
            Administrar Nota
          </Button>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">Nota existente</p>
            <Button onClick={() => onEdit(cita.id)}>Editar Nota</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
