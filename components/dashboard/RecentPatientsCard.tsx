// components/dashboard/RecentPatientsCard.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import usePatients from "@/hooks/usePatients";

export default function RecentPatientsCard() {
  const { patients, loading } = usePatients();

  // Tomamos los 5 pacientes más recientes
  const recent = React.useMemo(
    () =>
      [...patients]
        .sort(
          (a, b) =>
            new Date(b.registroPaciente.fechaCreacion).getTime() -
            new Date(a.registroPaciente.fechaCreacion).getTime()
        )
        .slice(0, 5),
    [patients]
  );

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-muted-foreground" />
          <div>
            <CardTitle>Pacientes recientes</CardTitle>
            <CardDescription>Últimos registros</CardDescription>
          </div>
        </div>
        <Link href="/dashboard/doctor/patients">
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="space-y-3">
        {loading ? (
          <p className="text-center py-4">Cargando pacientes…</p>
        ) : (
          recent.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <div>
                <p className="font-medium">
                  {p.registroPaciente.nombres} {p.registroPaciente.apellidos}
                </p>
                <p className="text-xs text-gray-500">
                  Registrado{" "}
                  {formatDistanceToNow(
                    new Date(p.registroPaciente.fechaCreacion),
                    { addSuffix: true }
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
