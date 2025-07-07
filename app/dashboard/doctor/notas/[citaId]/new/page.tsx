// app/dashboard/doctor/notas/[citaId]/new/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useNota from "@/hooks/useNota";
import NotaForm from "@/components/doctor-notas/NotaForm";

export default function NewNotaPage() {
  const router = useRouter();
  const { citaId } = useParams();
  const id = Number(citaId!);
  const { nota, loading, error, createNota } = useNota(id);

  // Si ya existe la nota, redirijo dentro de un useEffect
  useEffect(() => {
    if (nota) {
      router.replace(`/dashboard/doctor/notas/${id}`);
    }
  }, [nota, router, id]);

  if (loading) return <div className="p-4">Cargando nota…</div>;
  if (error)   return <div className="p-4 text-red-500">Error al cargar nota.</div>;
  // Mientras esperamos a que el effect haga el replace, evito renderizar el formulario
  if (nota)    return null;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generar Nota Clínica</h1>
      <NotaForm
        initial={undefined}
        citaId={id}
        onSubmit={async ({ contenido }) => {
          await createNota({ contenido });
          router.push("/dashboard/doctor/notas");
        }}
        onClose={() => router.push("/dashboard/doctor/notas")}
      />
    </div>
  );
}
