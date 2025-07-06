// components/solicitudes/SolicitudesTabs.tsx
"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SolicitudFilters from "./SolicitudFilters";
import SolicitudesList from "./SolicitudesList";
import NewSolicitudForm from "./NewSolicitudForm";
import useSolicitudes from "@/hooks/useSolicitudes";

export default function SolicitudesTabs() {
  const [activeTab, setActiveTab] = useState<"list" | "new">("list");
  const [fechaExacta, setFechaExacta] = useState<string>("");
  const [estado, setEstado] = useState<string>("PENDIENTE");
  const [searchText, setSearchText] = useState<string>("");

  const { mutate } = useSolicitudes();
  const handleSuccess = () => {
    setActiveTab("list");
    mutate();
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(val) => setActiveTab(val as "list" | "new")}
      className="space-y-4"
    >
      <TabsList>
        <TabsTrigger value="list">Mis Solicitudes</TabsTrigger>
        <TabsTrigger value="new">Nueva Solicitud</TabsTrigger>
      </TabsList>

      <TabsContent value="list" className="pt-4">
        <SolicitudFilters
          fechaExacta={fechaExacta}
          estado={estado}
          searchText={searchText}
          onFechaExactaChange={setFechaExacta}
          onEstadoChange={setEstado}
          onSearchTextChange={setSearchText}
        />
        <SolicitudesList
          fechaExacta={fechaExacta}
          estado={estado}
          searchText={searchText}
        />
      </TabsContent>

      <TabsContent value="new" className="pt-4">
        <NewSolicitudForm onSuccess={handleSuccess} />
      </TabsContent>
    </Tabs>
  );
}
