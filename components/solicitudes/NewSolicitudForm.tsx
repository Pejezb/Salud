// components/solicitudes/NewSolicitudForm.tsx
"use client";

import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TurnoPicker from "@/components/appointments/TurnoPicker";
import useTurnos from "@/hooks/useTurnos";
import useSolicitudes, { NewSolicitudPayload } from "@/hooks/useSolicitudes";

interface NewSolicitudFormProps {
  onSuccess: () => void;
}

const NewSolicitudForm: FC<NewSolicitudFormProps> = ({ onSuccess }) => {
  const [fecha, setFecha] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [turnoId, setTurnoId] = useState<number | null>(null);
  const [motivo, setMotivo] = useState<string>("");

  const DOCTOR_ID = 1;
  const { turnos, loading: loadingTurnos } = useTurnos(DOCTOR_ID, fecha);
  const { createSolicitud } = useSolicitudes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnoId) {
      alert("Selecciona un turno");
      return;
    }
    const payload: NewSolicitudPayload = {
      turnoId,
      motivo: motivo || undefined,
    };
    await createSolicitud(payload);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-6"
    >
      {/* Fecha */}
      <div>
        <Label htmlFor="fecha">Fecha de turno</Label>
        <input
          id="fecha"
          type="date"
          value={fecha}
          onChange={(e) => {
            setFecha(e.target.value);
            setTurnoId(null);
          }}
          className="block w-full rounded border px-3 py-2 bg-black text-white"
        />
      </div>

      {/* Selector de turno */}
      <div>
        <Label htmlFor="turno">Turno</Label>
        {loadingTurnos ? (
          <p>Cargando turnos…</p>
        ) : (
          <TurnoPicker
            turnos={turnos}
            value={turnoId}
            onChange={setTurnoId}
          />
        )}
      </div>

      {/* Motivo */}
      <div>
        <Label htmlFor="motivo">Motivo</Label>
        <textarea
          id="motivo"
          rows={3}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          className="block w-full rounded border p-2"
        />
      </div>

      {/* Botones */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onSuccess} type="button">
          Cancelar
        </Button>
        <Button type="submit">Enviar Solicitud</Button>
      </div>
    </form>
  );
};

export default NewSolicitudForm;
