// app/dashboard/patient/solicitudes/page.tsx
"use client";

import React from "react";
import SolicitudesTabs from "@/components/solicitudes/SolicitudesTabs";

export default function SolicitudesPage() {
  return (
    <div className="p-6 w-full">
      <SolicitudesTabs />
    </div>
  );
}
