// components/doctor-notas/NotaForm.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface NotaFormProps {
  initial?: { contenido: string };
  citaId: number;
  onSubmit: (payload: { contenido: string }) => Promise<void>;
  onClose: () => void;
}

export default function NotaForm({
  initial,
  citaId,
  onSubmit,
  onClose,
}: NotaFormProps) {
  const [contenido, setContenido] = useState(initial?.contenido || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contenido.trim()) {
      setError("El contenido no puede estar vacío");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSubmit({ contenido });
    } catch (err: any) {
      setError(err.message || "Error al guardar la nota");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-500">{error}</p>}

      <label className="block">
        <span className="font-medium text-gray-700">Contenido de la nota</span>
        <Textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows={8}
          className="mt-1 w-full"
          placeholder="Escribe aquí las observaciones, diagnósticos, medicamentos, etc."
        />
      </label>

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? "Guardando…" : "Guardar Nota"}
        </Button>
      </div>
    </form>
  );
}
