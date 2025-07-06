// app/dashboard/patient/solicitudes/[id]/page.tsx
"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface SolicitudDetail {
  id: number;
  motivo?: string;
  estado: "PENDIENTE" | "ACEPTADA" | "RECHAZADA";
  fechaSolicitud: string;
  turno: {
    fecha: string;
    horaInicio: string;
  };
  paciente: {
    nombres: string;
    apellidos: string;
  };
}

export default function SolicitudDetailPage() {
  const router = useRouter();
  const path = usePathname();
  const id = Number(path.split("/").pop());

  const fetcher = (url: string) =>
    fetch(url, { credentials: "include" }).then((r) => {
      if (!r.ok) throw new Error("Error cargando");
      return r.json();
    });

  const { data: s, error } = useSWR<SolicitudDetail>(
    `/api/solicitudes/${id}`,
    fetcher
  );

  if (error) return <p className="text-center py-4">Error al cargar.</p>;
  if (!s) return <p className="text-center py-4">Cargando…</p>;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-4">
        {/* Título centrado */}
        <h1 className="text-2xl font-bold text-center">
          Solicitud de cita #{s.id}
        </h1>

        {/* Datos alineados a la izquierda */}
        <div className="space-y-2 text-left">
          <p>
            <strong>Fecha y hora:</strong>{" "}
            {format(new Date(s.turno.fecha), "dd/MM/yyyy")}{" "}
            {format(new Date(s.turno.horaInicio), "HH:mm")}
          </p>
          <p>
            <strong>Paciente:</strong> {s.paciente.nombres}{" "}
            {s.paciente.apellidos}
          </p>
          <p>
            <strong>Motivo:</strong> {s.motivo || "–"}
          </p>
          <p>
            <strong>Estado:</strong>{" "}
            <span className={`capitalize ${s.estado === "PENDIENTE" ? "text-yellow-600" : s.estado === "ACEPTADA" ? "text-green-600" : "text-red-600"}`}>
              {s.estado.toLowerCase()}
            </span>
          </p>
        </div>

        {/* Botón de cancelar si está pendiente */}
        <div className="flex justify-center space-x-4 pt-2">
          {s.estado === "PENDIENTE" && (
            <Button
              variant="destructive"
              onClick={() => {
                if (confirm("¿Cancelar esta solicitud?")) {
                  fetch(`/api/solicitudes/${s.id}`, {
                    method: "DELETE",
                    credentials: "include",
                  }).then(() => router.push("/dashboard/patient/solicitudes"));
                }
              }}
            >
              Cancelar Solicitud
            </Button>
          )}
        </div>

        {/* Botón Volver centrado */}
        <Button
          variant="outline"
          className="mx-auto"
          onClick={() => router.back()}
        >
          Volver
        </Button>
      </div>
    </div>
  );
}
