// components/solicitudes/SolicitudFilters.tsx
"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SolicitudFiltersProps {
  fechaExacta: string;
  estado: string;
  searchText: string;
  onFechaExactaChange: (v: string) => void;
  onEstadoChange: (v: string) => void;
  onSearchTextChange: (v: string) => void;
}

export default function SolicitudFilters({
  fechaExacta,
  estado,
  searchText,
  onFechaExactaChange,
  onEstadoChange,
  onSearchTextChange,
}: SolicitudFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      {/* Fecha exacta */}
      <div>
        <Label htmlFor="fecha-exacta">Fecha</Label>
        <Input
          id="fecha-exacta"
          type="date"
          value={fechaExacta}
          onChange={(e) => onFechaExactaChange(e.target.value)}
          className="w-40"
        />
      </div>

      {/* Estado */}
      <div>
        <Label htmlFor="estado">Estado</Label>
        <Select
          value={estado}
          onValueChange={(v) => onEstadoChange(v)}
        >
          <SelectTrigger id="estado" className="w-40">
            <SelectValue placeholder="Pendientes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            <SelectItem value="PENDIENTE">Pendientes</SelectItem>
            <SelectItem value="ACEPTADA">Aceptadas</SelectItem>
            <SelectItem value="RECHAZADA">Rechazadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Texto libre */}
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="search">Buscar</Label>
        <Input
          id="search"
          type="text"
          placeholder="Texto libre..."
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
        />
      </div>
    </div>
  );
}
