// components/doctor-notas/NotasFilters.tsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";

export interface NotasFiltersProps {
  /** Called whenever any filter value changes */
  onChange: (filters: {
    searchText: string;
    date?: string;
    tipoRegistro?: string;
  }) => void;
}

/**
 * Barra de filtros para el listado de notas clínicas.
 * Incluye:
 *  - Búsqueda por nombre de paciente o contenido
 *  - Selector de fecha de cita
 *  - Dropdown de tipo de registro (consulta/se­guimiento/evaluación)
 */
export default function NotasFilters({ onChange }: NotasFiltersProps) {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [tipoRegistro, setTipoRegistro] = useState<"ALL" | "CONSULTA" | "SEGUIMIENTO" | "EVALUACION">("ALL");

  // Emitir los filtros actuales al padre
  useEffect(() => {
    onChange({
      searchText: searchText.trim(),
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined,
      tipoRegistro: tipoRegistro !== "ALL" ? tipoRegistro : undefined,
    });
  }, [searchText, selectedDate, tipoRegistro, onChange]);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
      {/* Input de búsqueda */}
      <Input
        placeholder="Buscar paciente o contenido..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="flex-1"
      />

      {/* Dropdown de tipo de registro */}
      <Select value={tipoRegistro} onValueChange={(v) => setTipoRegistro(v as any)}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Tipo de registro" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Todas</SelectItem>
          <SelectItem value="CONSULTA">Consulta</SelectItem>
          <SelectItem value="SEGUIMIENTO">Seguimiento</SelectItem>
          <SelectItem value="EVALUACION">Evaluación</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
