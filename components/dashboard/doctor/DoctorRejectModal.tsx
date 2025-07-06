// components/dashboard/doctor/DoctorRejectModal.tsx
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

interface DoctorRejectModalProps {
  open: boolean;
  solicitudId: number;
  defaultMotivo?: string;
  onClose: () => void;
  onConfirm: (motivo: string) => Promise<void>;
}

export default function DoctorRejectModal({
  open,
  solicitudId,
  defaultMotivo = "",
  onClose,
  onConfirm,
}: DoctorRejectModalProps) {
  const [motivo, setMotivo] = useState(defaultMotivo);

  useEffect(() => {
    if (open) setMotivo(defaultMotivo);
  }, [open, defaultMotivo]);

  const handleSubmit = async () => {
    await onConfirm(motivo);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Rechazar Solicitud #{solicitudId}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Label htmlFor="motivo-rechazo">Motivo de rechazo</Label>
          <textarea
            id="motivo-rechazo"
            rows={4}
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            Rechazar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
