import { Notification } from "@/types/notification";

export async function fetchNotificaciones(
  usuarioId: number
): Promise<Notification[]> {
  const res = await fetch(`/api/notificaciones?usuarioId=${usuarioId}`);
  if (!res.ok) throw new Error("Error al cargar notificaciones");
  return res.json();
}

export async function marcarLeido(id: number): Promise<void> {
  const res = await fetch(`/api/notificaciones?id=${id}`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Error al marcar notificación como leída");
}
