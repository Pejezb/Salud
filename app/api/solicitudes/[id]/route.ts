// app/api/solicitudes/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { logNotificacion } from "@/lib/auditoria"; // ← importamos el helper

interface JWTPayload {
  userId: number;
}

function verifyToken(req: NextRequest): JWTPayload | null {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch {
    return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const payload = verifyToken(req);
  if (!payload) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const id = Number(params.id);
  const sol = await prisma.solicitudCita.findUnique({
    where: { id },
    include: {
      paciente: {
        select: {
          usuarioId: true,
          nombres: true,
          apellidos: true,
          dni: true,
        },
      },
      turno: true,
    },
  });

  if (!sol) {
    return NextResponse.json(
      { message: "Solicitud no encontrada" },
      { status: 404 }
    );
  }

  const isDoctor = payload.userId === 1;
  if (!isDoctor && sol.paciente.usuarioId !== payload.userId) {
    return NextResponse.json(
      { message: "Sin permisos para ver esta solicitud" },
      { status: 403 }
    );
  }

  return NextResponse.json(sol);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const payload = verifyToken(req);
  if (!payload) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const id = Number(params.id);
  const sol = await prisma.solicitudCita.findUnique({
    where: { id },
    select: {
      paciente: {
        select: {
          usuarioId: true,
          nombres: true,
          apellidos: true,
        },
      },
    },
  });
  if (!sol) {
    return NextResponse.json(
      { message: "Solicitud no encontrada" },
      { status: 404 }
    );
  }

  const isDoctor = payload.userId === 1;
  if (!isDoctor && sol.paciente.usuarioId !== payload.userId) {
    return NextResponse.json(
      { message: "Sin permisos para eliminar esta solicitud" },
      { status: 403 }
    );
  }

  // Borrado de la solicitud
  await prisma.solicitudCita.delete({ where: { id } });

  // Registrar notificación al paciente de que su solicitud fue eliminada
  await logNotificacion({
    usuarioId: sol.paciente.usuarioId,
    accion: "ELIMINAR_SOLICITUD",
    descripcion: `Tu solicitud ha sido eliminada por ${isDoctor ? "el doctor" : "tú mismo"}`,
    entidad: "Solicitud",
    entidadId: id,
  });

  return NextResponse.json({ ok: true });
}
