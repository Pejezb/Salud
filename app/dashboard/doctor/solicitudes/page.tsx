// app/dashboard/doctor/solicitudes/page.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DoctorRequestsList from "@/components/dashboard/doctor/DoctorRequestsList";

export default function DoctorSolicitudesPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Título principal */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Solicitudes de Cita
      </h1>

      {/* Card con sombra ligera y bordes redondeados */}
      <Card className="rounded-lg shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b">
          {/* Título de sección con color de acento */}
          <CardTitle className="text-lg font-semibold text-blue-600">
            
          </CardTitle>
        </CardHeader>

        <CardContent className="bg-white pt-4">
          <DoctorRequestsList />
        </CardContent>
      </Card>
    </div>
  );
}
