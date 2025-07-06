// components/dashboard/doctor/DoctorAcceptModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DoctorAcceptModalProps {
  open: boolean;
  solicitudId: number;
  defaultObservaciones?: string;
  onClose: () => void;
  onConfirm: (
    tipo: "CONSULTA" | "SEGUIMIENTO" | "EVALUACION",
    observaciones?: string
  ) => Promise<void>;
}

export default function DoctorAcceptModal({
  open,
  solicitudId,
  defaultObservaciones = "",
  onClose,
  onConfirm,
}: DoctorAcceptModalProps) {
  const [tipo, setTipo] = useState<"CONSULTA" | "SEGUIMIENTO" | "EVALUACION">(
    "CONSULTA"
  );
  const [obs, setObs] = useState(defaultObservaciones);

  // Reset fields when modal opens
  useEffect(() => {
    if (open) {
      setTipo("CONSULTA");
      setObs(defaultObservaciones);
    }
  }, [open, defaultObservaciones]);

  const handleSubmit = async () => {
    await onConfirm(tipo, obs);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Aceptar Solicitud #{solicitudId}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="tipo-cita">Tipo de cita</Label>
            <select
              id="tipo-cita"
              value={tipo}
              onChange={(e) =>
                setTipo(e.target.value as "CONSULTA" | "SEGUIMIENTO" | "EVALUACION")
              }
              className="block w-full border rounded px-2 py-1"
            >
              <option value="CONSULTA">Consulta</option>
              <option value="SEGUIMIENTO">Seguimiento</option>
              <option value="EVALUACION">Evaluación</option>
            </select>
          </div>

          <div>
            <Label htmlFor="observaciones">Observaciones</Label>
            <textarea
              id="observaciones"
              rows={3}
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              className="block w-full border rounded p-2"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Aceptar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
