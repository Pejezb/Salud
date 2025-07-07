// src/hooks/useNotificaciones.ts
"use client";

import useSWR, { KeyedMutator } from "swr";
import {
  fetchNotificaciones,
  marcarLeido as serviceMarcarLeido,
} from "@/services/notificationService";
import { Notification } from "@/types/notification";

export default function useNotificaciones(usuarioId: number): {
  notificaciones: Notification[];
  marcarLeido: (id: number) => Promise<void>;
  isLoading: boolean;
  mutate: KeyedMutator<Notification[]>;
} {
  const { data, error, mutate } = useSWR<Notification[]>(
    usuarioId ? ["/api/notificaciones", usuarioId] : null,
    () => fetchNotificaciones(usuarioId)
  );

  const notificaciones = data || [];

  async function marcarLeido(id: number) {
    await serviceMarcarLeido(id);
    // opcional: filtrado rápido local
    mutate(notificaciones.filter((n) => n.id !== id), false);
  }

  return {
    notificaciones,
    marcarLeido,
    isLoading: !data && !error,
    mutate,                // <-- aquí lo añadimos
  };
}
