'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import usePatientCitas from "@/hooks/usePatientCitas";
import PatientNotasList from "@/components/patient-notas/PatientNotasList";

export default function PatientNotasPage() {
  const router = useRouter();

  // 1) hooks arriba
  const { user, loading: authLoading } = useAuth();
  const pacienteId = user?.id; // viene de useAuth
  const { citas, loading: citasLoading, error: citasError } =
    usePatientCitas(pacienteId);

  // 2) redirigir si no es paciente
  useEffect(() => {
    if (!authLoading && (!user || user.tipoUsuario !== "patient")) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // 3) estados de carga / error
  if (authLoading) {
    return <div className="py-8 text-center">Validando usuario…</div>;
  }
  if (!user) return null; // ya redirigió

  if (citasLoading) {
    return <div className="py-8 text-center">Cargando historial clínico…</div>;
  }
  if (citasError) {
    return (
      <div className="py-8 text-center text-red-500">
        Error al cargar historial clínico.
      </div>
    );
  }

  // 4) render
  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Historial Clínico</h1>
      <PatientNotasList
        citas={citas || []}
        onView={(citaId) =>
          router.push(`/dashboard/patient/notas/${citaId}`)
        }
      />
    </div>
  );
}
