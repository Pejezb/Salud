// app/dashboard/patient/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import PatientRequestsList from "@/components/dashboard/paciente/PatientRequestsList";
import PatientAppointmentsList from "@/components/dashboard/paciente/PatientAppointmentsList";
import { Button } from "@/components/ui/button";


export default function PatientDashboardPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mis Solicitudes */}
        <Card className="rounded-lg shadow-sm overflow-hidden">
          <CardHeader className="px-6 py-4 bg-white border-b flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">
                Mis Solicitudes
              </CardTitle>
              <CardDescription>Solicitudes de cita pendientes</CardDescription>
            </div>
            <Link href="/dashboard/patient/solicitudes">
              <Button variant="outline" size="sm">
                Ver Todas
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="px-6 py-4 bg-white space-y-4">
            <PatientRequestsList />
          </CardContent>
        </Card>

        {/* Mis Citas */}
        <Card className="rounded-lg shadow-sm overflow-hidden">
          <CardHeader className="px-6 py-4 bg-white border-b flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold">
                Mis Citas
              </CardTitle>
              <CardDescription>Próximas citas programadas</CardDescription>
            </div>
            <Link href="/dashboard/patient/appointments">
              <Button variant="outline" size="sm">
                Ver Todas
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="px-6 py-4 bg-white space-y-4">
            <PatientAppointmentsList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}