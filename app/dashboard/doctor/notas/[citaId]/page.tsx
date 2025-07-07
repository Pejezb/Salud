// app/dashboard/doctor/notas/[citaId]/page.tsx
"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import useNota from "@/hooks/useNota";
import NotaDetail from "@/components/doctor-notas/NotaDetail";

export default function NotaDetailPage() {
  const router = useRouter();
  const { citaId } = useParams();
  const id = Number(citaId!);
  const { nota, loading, error, deleteNota } = useNota(id);

  if (loading) {
    return <div className="p-4">Cargando nota…</div>;
  }
  if (error) {
    return <div className="p-4 text-red-500">Error al cargar nota.</div>;
  }

  if (!nota) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4">Aún no existe una nota para esta cita.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => router.push(`/dashboard/doctor/notas/${id}/new`)}
        >
          Crear Nota
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <NotaDetail
        nota={nota}
        onDelete={async () => {
          await deleteNota();
          router.push("/dashboard/doctor/notas");
        }}
      />
    </div>
  );
}
