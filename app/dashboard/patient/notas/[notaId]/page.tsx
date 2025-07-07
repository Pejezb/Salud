// app/dashboard/patient/notas/[notaId]/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import useNota from '@/hooks/useNota';
import NotaDetail from '@/components/doctor-notas/NotaDetail';
import { Button } from '@/components/ui/button';

export default function PatientNotaDetailPage() {
  const router = useRouter();
  const { notaId } = useParams<{ notaId: string }>();
  const idNum = Number(notaId);

  // 1) Hooks arriba
  const { user, loading: authLoading } = useAuth();
  const { nota, loading: notaLoading, error: notaError } = useNota(idNum);

  // 2) Sólo pacientes
  useEffect(() => {
    if (!authLoading && (!user || user.tipoUsuario !== 'patient')) {
      router.replace('/login');
    }
  }, [authLoading, user, router]);

  // 3) Carga / error
  if (authLoading || notaLoading) {
    return (
      <div className="py-8 px-4 max-w-2xl mx-auto text-center">
        Cargando nota clínica…
      </div>
    );
  }
  if (notaError) {
    return (
      <div className="py-8 px-4 max-w-2xl mx-auto text-center text-red-500">
        Error al cargar la nota clínica.
      </div>
    );
  }
  if (!nota) {
    return (
      <div className="py-8 px-4 max-w-2xl mx-auto text-center">
        No se encontró la nota clínica.
      </div>
    );
  }

  // 4) Render sólo lectura, sin acciones
  return (
    <div className="py-8 px-4 max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="mb-6"
      >
        ← Volver
      </Button>
      <NotaDetail
        nota={nota}
        showActions={false}      // ← aquí ocultas botones
      />
    </div>
  );
}
