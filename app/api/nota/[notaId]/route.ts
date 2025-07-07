// app/api/nota/[notaId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logNotificacion } from "@/lib/auditoria";  // ← helper de auditoría

export async function PUT(
  req: Request,
  { params }: { params: { notaId: string } }
) {
  const notaId = Number(params.notaId);
  const { contenido } = await req.json();

  if (!contenido) {
    return NextResponse.json(
      { message: "Contenido requerido" },
      { status: 400 }
    );
  }

  // 1) Actualizar la nota
  const updated = await prisma.notaClinica.update({
    where: { id: notaId },
    data: { contenido },
    include: {
      cita: { select: { pacienteId: true, turno: { select: { fecha: true } } } }
    }
  });

  // 2) Registrar notificación al paciente
  await logNotificacion({
    usuarioId: updated.cita.pacienteId,
    accion: "CREAR_NOTA_CLINICA",
    descripcion: `Se ha actualizado tu nota clínica de la cita del ${new Date(
      updated.cita.turno.fecha
    ).toLocaleDateString()}`,
    entidad: "NotaClinica",
    entidadId: updated.id,
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { notaId: string } }
) {
  const notaId = Number(params.notaId);
  await prisma.notaClinica.delete({ where: { id: notaId } });
  return NextResponse.json({ message: "Nota eliminada" });
}
