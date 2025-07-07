// src/components/notifications/NotificationDropdown.tsx
"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import NotificationBell from "./NotificationBell";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import useNotificaciones from "@/hooks/useNotificaciones";
import NotificationItem from "./NotificationItem";

export default function NotificationDropdown() {
  const { user } = useAuth();
  const usuarioId = user?.id ?? 0;

  // ¡HOOKS SIEMPRE en el mismo orden!
  const { notificaciones, marcarLeido, isLoading, mutate } =
    useNotificaciones(usuarioId);

  // Opcional: recarga al montar
  useEffect(() => {
    if (usuarioId) mutate();
  }, [mutate, usuarioId]);

  const count = notificaciones.length;

  // Ahora sí puedes condicionar el render
  if (!usuarioId) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NotificationBell count={count} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        {isLoading ? (
          <div className="p-2 text-sm text-gray-500">Cargando…</div>
        ) : count === 0 ? (
          <div className="p-2 text-sm text-gray-500">Sin notificaciones</div>
        ) : (
          notificaciones.map((n) => (
            <NotificationItem
              key={n.id}
              notification={n}
              onRead={async () => {
                await marcarLeido(n.id);
                mutate();
              }}
            />
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
