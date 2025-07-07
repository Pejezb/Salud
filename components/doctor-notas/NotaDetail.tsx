// components/doctor-notas/NotaDetail.tsx
'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { NotaAPI as Nota } from "@/hooks/useNota";
import ConfirmDeleteDialog from "@/components/doctor-notas/ConfirmDeleteDialog";

interface Props {
  nota: Nota;
  onEdit: (notaId: number) => void;
  onDelete: (notaId: number) => void;
}

export default function NotaDetail({ nota, onEdit, onDelete }: Props) {
  const router = useRouter();
  const { cita } = nota;
  const pacienteNombre = `${cita.paciente.nombres} ${cita.paciente.apellidos}`;
  const fechaCita = format(new Date(cita.turno.fecha), "dd/MM/yyyy");
  const horaInicio = format(new Date(cita.turno.horaInicio), "HH:mm");
  const horaFin = format(new Date(cita.turno.horaFin), "HH:mm");
  const fechaNota = format(new Date(nota.fecha), "dd/MM/yyyy 'a las' HH:mm");

  return (
    <div>
      {/* Botón de regreso */}
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => router.back()}
      >
        ← Volver
      </Button>

      <Card className="rounded-lg shadow transition-shadow hover:shadow-md overflow-hidden">
        <CardHeader className="bg-gray-50 p-4">
          <h2 className="text-xl font-semibold">Nota Clínica #{nota.id}</h2>
          <p className="text-sm text-gray-600">Creada: {fechaNota}</p>
          <p className="text-sm text-gray-800 mt-2">
            Cita #{cita.id} — {pacienteNombre}
          </p>
          <p className="text-sm text-gray-600">
            {fechaCita} • {horaInicio} – {horaFin} ({cita.tipoDeCita.toLowerCase()})
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="prose max-w-none">
            <p>{nota.contenido}</p>
          </div>
          <div className="flex gap-4">
            <ConfirmDeleteDialog
              trigger={<Button variant="destructive">Eliminar Nota</Button>}
              onConfirm={() => onDelete(nota.id)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
