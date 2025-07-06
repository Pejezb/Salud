// app/dashboard/doctor/appointments/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useCitas, { NewCitaPayload, UpdateCitaPayload } from "@/hooks/useCitas";
import useTurnos from "@/hooks/useTurnos";
import usePatients from "@/hooks/usePatients";
import type { Cita } from "@/hooks/useCitas";
import AppointmentFilters, { AppointmentFilter } from "@/components/appointments/AppointmentFilters";
import AppointmentTable from "@/components/appointments/AppointmentTable";
import AppointmentForm from "@/components/appointments/AppointmentForm";

const DOCTOR_ID = 1;

export default function AppointmentsPage() {
  const {
    citas,
    loading: loadingCitas,
    error,
    createCita,
    updateCita,
    deleteCita,
  } = useCitas();
  const { patients, loading: loadingPatients } = usePatients();

  const [filter, setFilter] = useState<AppointmentFilter>({
    search: "",
    status: "PROXIMA",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [viewingCita, setViewingCita] = useState<Cita | null>(null);

  // Fecha para cargar turnos
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const { turnos, loading: loadingTurnos } = useTurnos(DOCTOR_ID, fecha);

  // Filtrar y luego ordenar por proximidad (fecha+h. inicio ascendente)
  const filteredAndSorted = useMemo(() => {
    return citas
      .filter((c) => {
        const statusMatch =
          filter.status === "all" || c.estado === filter.status;
        const fullName = `${c.paciente.nombres} ${c.paciente.apellidos}`.toLowerCase();
        const searchLower = filter.search.toLowerCase();
        const nameMatch = fullName.includes(searchLower);
        const typeMatch = c.tipoDeCita.toLowerCase().includes(searchLower);
        return statusMatch && (nameMatch || typeMatch);
      })
      .sort((a, b) => {
        const dtA = new Date(`${a.turno.fecha}T${a.turno.horaInicio}`);
        const dtB = new Date(`${b.turno.fecha}T${b.turno.horaInicio}`);
        return dtA.getTime() - dtB.getTime();
      });
  }, [citas, filter]);

  const handleCreate = () => {
    setViewingCita(null);
    setModalOpen(true);
  };

  const handleView = (cita: Cita) => {
    setViewingCita(cita);
    setModalOpen(true);
  };

  const handleCancel = async (id: number) => {
    await updateCita(id, { estado: "CANCELADA" } as UpdateCitaPayload);
  };

  const handleComplete = async (id: number) => {
    await updateCita(id, { estado: "COMPLETADA" } as UpdateCitaPayload);
  };

  const handleDelete = async (id: number) => {
    await deleteCita(id);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Citas</h1>
        <div className="flex gap-2">
          <Input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="bg-gray-800 text-white border-gray-700"
          />
          <Button onClick={handleCreate}>Nueva Cita</Button>
        </div>
      </div>

      {/* Filters */}
      <AppointmentFilters filter={filter} onChange={setFilter} />

      {/* Table or loader */}
      {loadingCitas ? (
        <p>Cargando citas…</p>
      ) : error ? (
        <p className="text-red-500">Error al cargar citas</p>
      ) : (
        <AppointmentTable
          citas={filteredAndSorted}
          onView={handleView}
          onCancel={handleCancel}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) setViewingCita(null);
          setModalOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {viewingCita ? "Ver Observaciones" : "Nueva Cita"}
            </DialogTitle>
          </DialogHeader>

          {viewingCita ? (
            <div className="space-y-2 p-4">
              <p>
                <strong>Paciente:</strong> {viewingCita.paciente.nombres}{" "}
                {viewingCita.paciente.apellidos}
              </p>
              <p>
                <strong>Turno:</strong>{" "}
                {`${new Date(viewingCita.turno.fecha).toLocaleDateString()} ${new Date(
                  viewingCita.turno.horaInicio
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </p>
              <p>
                <strong>Estado:</strong> {viewingCita.estado}
              </p>
              <p>
                <strong>Tipo:</strong> {viewingCita.tipoDeCita}
              </p>
              <p>
                <strong>Observaciones:</strong>
              </p>
              <p>{viewingCita.observaciones || "Sin observaciones"}</p>
            </div>
          ) : loadingPatients || loadingTurnos ? (
            <p>Cargando datos…</p>
          ) : (
            <AppointmentForm
              patients={patients}
              turnos={turnos}
              cita={null}
              onSave={async (data: NewCitaPayload & { turnoId: number }) => {
                await createCita(data);
                setModalOpen(false);
              }}
              onCancel={() => setModalOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
