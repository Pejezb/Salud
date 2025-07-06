// app/dashboard/doctor/solicitudes/[id]/page.tsx
"use client";

import React from "react";
import useSWR from "swr";
import { useRouter, usePathname } from "next/navigation";
import DoctorSolicitudCard from "@/components/dashboard/doctor/DoctorSolicitudCard";
import useSolicitudes, { Solicitud } from "@/hooks/useSolicitudes";

const fetcher = (url: string): Promise<Solicitud> =>
  fetch(url, { credentials: "include" }).then((res) => {
    if (!res.ok) throw new Error("Error cargando solicitud");
    return res.json();
  });

export default function DoctorSolicitudDetailPage() {
  const router = useRouter();
  const id = Number(usePathname().split("/").pop());
  const { data: sol, error } = useSWR<Solicitud>(
    `/api/solicitudes/${id}`,
    fetcher
  );
  const { mutate } = useSolicitudes();

  if (error) return <p className="text-center py-4">Error al cargar solicitud.</p>;
  if (!sol) return <p className="text-center py-4">Cargando solicitud…</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <DoctorSolicitudCard
        solicitud={sol}
        onAccepted={() => {
          mutate();
          router.push("/dashboard/doctor/solicitudes");
        }}
        onRejected={() => {
          mutate();
          router.push("/dashboard/doctor/solicitudes");
        }}
      />
    </div>
  );
}
