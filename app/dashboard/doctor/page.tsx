// app/dashboard/doctor/page.tsx
"use client";

import React from "react";
import DoctorStats from "@/components/dashboard/DoctorStats";
import RecentPatientsCard from "@/components/dashboard/RecentPatientsCard";
import UpcomingAppointmentsCard from "@/components/dashboard/UpcomingAppointmentsCard";
import RecentSolicitudes from "@/components/dashboard/RecentSolicitudes";

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Estadísticas rápidas */}
      <DoctorStats />

      {/* Grid de tarjetas */}
      <div className="grid gap-4 md:grid-cols-3">
        <RecentPatientsCard />
        <UpcomingAppointmentsCard />
        <RecentSolicitudes />
      </div>
    </div>
  );
}
