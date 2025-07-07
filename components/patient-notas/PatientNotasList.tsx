// components/patient-notas/PatientNotasList.tsx
'use client';

import React from 'react';
import { format } from 'date-fns';
import { CitaAPI } from '@/hooks/usePatientCitas';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface PatientNotasListProps {
  /** Las citas del paciente (para luego ver la nota de cada una) */
  citas: CitaAPI[];
  /** Llamado al pulsar “Ver Nota Clínica” */
  onView: (citaId: number) => void;
}

export default function PatientNotasList({
  citas,
  onView,
}: PatientNotasListProps) {
  if (!citas || citas.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No tienes citas registradas.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {citas.map((cita) => {
        const fechaStr = format(new Date(cita.turno.fecha), 'dd/MM/yyyy');
        const horaInicio = format(new Date(cita.turno.horaInicio), 'HH:mm');
        const horaFin = format(new Date(cita.turno.horaFin), 'HH:mm');

        return (
          <Card key={cita.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 p-4">
              <h3 className="font-semibold text-lg">
                Cita #{cita.id} — {fechaStr}
              </h3>
              <p className="text-sm text-gray-600">
                {horaInicio} – {horaFin} ({cita.tipoDeCita.toLowerCase()})
              </p>
            </CardHeader>
            <CardContent className="p-4">
              {/* aquí podrías poner un resumen, o datos del paciente si quieres */}
            </CardContent>
            <CardFooter className="flex justify-end p-4">
              <Button variant="outline" onClick={() => onView(cita.id)}>
                Ver Nota Clínica
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
