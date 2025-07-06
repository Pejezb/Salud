// components/dashboard/doctor/DoctorSolicitudCard.tsx
"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DoctorRejectModal from "./DoctorRejectModal";
import DoctorAcceptModal from "./DoctorAcceptModal";
import useSolicitudes from "@/hooks/useSolicitudes";

export interface DoctorSolicitudCardProps {
  solicitud: {
    id: number;
    turno: { fecha: string; horaInicio: string };
    paciente: { nombres: string; apellidos: string };
    motivo?: string;
  };
  onAccepted?: () => void;
  onRejected?: () => void;
}

export default function DoctorSolicitudCard({
  solicitud: s,
  onAccepted,
  onRejected,
}: DoctorSolicitudCardProps) {
  const { acceptSolicitud, rejectSolicitud } = useSolicitudes();
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);

  // Lanza la aceptación con tipo y observaciones
  const handleAccept = async (
    tipoDeCita: "CONSULTA" | "SEGUIMIENTO" | "EVALUACION",
    observaciones?: string
  ) => {
    await acceptSolicitud(s.id, { tipoDeCita, observaciones });
    onAccepted?.();
    setAcceptModalOpen(false);
  };

  // Lanza el rechazo con motivo
  const handleReject = async (motivo: string) => {
    await rejectSolicitud(s.id, motivo);
    onRejected?.();
    setRejectModalOpen(false);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="text-center">
          <h2 className="text-lg font-semibold">Solicitud de cita #{s.id}</h2>
          <p className="text-sm text-gray-600">
            {format(new Date(s.turno.fecha), "dd/MM/yyyy")}{" "}
            {format(new Date(s.turno.horaInicio), "HH:mm")}
          </p>
        </CardHeader>

        <CardContent className="space-y-2 text-center">
          <p className="font-medium">
            {s.paciente.nombres} {s.paciente.apellidos}
          </p>
          {s.motivo && <p className="text-gray-700">{s.motivo}</p>}

          <div className="flex justify-center gap-4 pt-2">
            <Button onClick={() => setAcceptModalOpen(true)}>Aceptar</Button>
            <Button variant="destructive" onClick={() => setRejectModalOpen(true)}>
              Rechazar
            </Button>
          </div>
        </CardContent>
      </Card>

      <DoctorAcceptModal
        open={acceptModalOpen}
        solicitudId={s.id}
        defaultObservaciones={s.motivo}
        onClose={() => setAcceptModalOpen(false)}
        onConfirm={handleAccept}
      />

      <DoctorRejectModal
        open={rejectModalOpen}
        solicitudId={s.id}
        defaultMotivo="Horario no disponible"
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleReject}
      />
    </>
  );
}
