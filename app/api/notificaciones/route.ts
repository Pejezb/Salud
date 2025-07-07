// app/api/notificaciones/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const usuarioId = parseInt(new URL(request.url).searchParams.get("usuarioId") || "0", 10);
  if (!usuarioId) {
    return NextResponse.json({ error: "usuarioId requerido" }, { status: 400 });
  }

  const logs = await prisma.registroAuditoria.findMany({
    where: {
      usuarioId,
      accion: {
        in: [
          "CREAR_SOLICITUD",
          "ACTUALIZAR_SOLICITUD",
          "ELIMINAR_SOLICITUD",
          "PROGRAMAR_CITA",
          "CREAR_NOTA_CLINICA",
          "ACTUALIZAR_NOTA",
        ],
      },
    },
    orderBy: { fecha: "desc" },
    take: 20,
  });

  return NextResponse.json(logs);
}

export async function PATCH(request: NextRequest) {
  const id = parseInt(new URL(request.url).searchParams.get("id") || "0", 10);
  if (!id) {
    return NextResponse.json({ error: "id requerido" }, { status: 400 });
  }

  // <-- ELIMINAMOS el log para que ya no aparezca
  await prisma.registroAuditoria.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
