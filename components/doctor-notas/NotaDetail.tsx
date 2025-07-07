// components/doctor-notas/NotaDetail.tsx
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { NotaAPI as Nota } from "@/hooks/useNota";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface Props {
  nota: Nota;
  onDelete?: (notaId: number) => void;
  /** Si es false, oculta los botones de acciones */
  showActions?: boolean;
}

export default function NotaDetail({
  nota,
  onDelete,
  showActions = true,
}: Props) {
  const router = useRouter();
  const { cita } = nota;
  const pacienteNombre = `${cita.paciente.nombres} ${cita.paciente.apellidos}`;
  const fechaCita = format(new Date(cita.turno.fecha), "dd/MM/yyyy");
  const horaInicio = format(new Date(cita.turno.horaInicio), "HH:mm");
  const horaFin = format(new Date(cita.turno.horaFin), "HH:mm");
  const fechaNota = format(new Date(nota.fecha), "dd/MM/yyyy 'a las' HH:mm");

  return (
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
          {nota.contenido.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="p-6 flex gap-4">
          {/* Botón “Volver a notas” para el doctor */}
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard/doctor/notas")}
          >
          Volver a Notas
          </Button>

          {/* Confirmación de eliminación */}
          {onDelete && (
            <ConfirmDeleteDialog
              trigger={<Button variant="destructive">Eliminar Nota</Button>}
              onConfirm={() => onDelete(nota.id)}
            />
          )}
        </CardFooter>
      )}
    </Card>
  );
}
