// components/citas/CitaCard.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "framer-motion";
import type { Cita as CitaType } from "@/hooks/useCitas";

interface Props {
  cita: CitaType;
}

export default function CitaCard({ cita }: Props) {
  // Parseamos directamente los timestamps de inicio y fin
  const inicio = new Date(cita.turno.horaInicio);
  const fin    = new Date(cita.turno.horaFin);

  // Formateamos fecha y hora por separado
  const fechaStr = format(inicio, "dd/MM/yyyy");
  const horaStr  = `${format(inicio, "HH:mm")} – ${format(fin, "HH:mm")}`;

  // Nombre completo del paciente
  const pacienteNombre = `${cita.paciente.nombres} ${cita.paciente.apellidos}`;

  // Colores para el badge según estado
  const badgeColors = {
    PROXIMA:    "bg-green-100 text-green-800",
    COMPLETADA: "bg-blue-100 text-blue-800",
    CANCELADA:  "bg-red-100 text-red-800",
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="max-w-md mx-auto rounded-xl shadow-sm overflow-hidden">
        <CardContent className="p-6 bg-white">
          <h2 className="text-xl font-semibold mb-1">
            Cita #{cita.id}
          </h2>
          <p className="text-gray-600 mb-1">
            {fechaStr} • {horaStr}
          </p>
          <p className="text-gray-800 font-medium mb-1">
            {pacienteNombre}
          </p>
          {/* Tipo de cita */}
          <p className="text-gray-700 mb-1">
            Tipo: <span className="font-medium">{cita.tipoDeCita.toLowerCase()}</span>
          </p>
          {cita.observaciones && (
            <p className="text-gray-700 mb-3">
              Motivo: {cita.observaciones}
            </p>
          )}
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badgeColors[cita.estado]}`}
          >
            {cita.estado.toLowerCase()}
          </span>
        </CardContent>
      </Card>
    </motion.div>
  );
}
