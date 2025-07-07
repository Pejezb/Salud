import prisma from "@/lib/prisma";

export async function logNotificacion(args: {
  usuarioId: number;
  accion: string;
  descripcion: string;
  entidad: string;
  entidadId: number;
}) {
  // Verificar que la función se esté llamando
  console.log("LOG NOTIF ➡️", args);

  return prisma.registroAuditoria.create({
    data: args,
  });
}
