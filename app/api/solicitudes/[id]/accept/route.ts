// app/api/solicitudes/[id]/accept/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: number;
}

// Verifica y devuelve el payload, o null si no válido
function verifyToken(req: NextRequest): JWTPayload | null {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch {
    return null;
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1) Autenticación
  const payload = verifyToken(req);
  if (!payload) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }
  // sólo el doctor (userId===1) puede aceptar
  if (payload.userId !== 1) {
    return NextResponse.json({ message: "Sin permisos" }, { status: 403 });
  }

  const id = Number(params.id);
  const body = await req.json();
  const { tipoDeCita, observaciones } = body as {
    tipoDeCita: "CONSULTA" | "SEGUIMIENTO" | "EVALUACION";
    observaciones?: string;
  };

  // 2) Buscar la solicitud original
  const sol = await prisma.solicitudCita.findUnique({
    where: { id },
    select: { turnoId: true, pacienteId: true },
  });
  if (!sol) {
    return NextResponse.json({ message: "Solicitud no encontrada" }, { status: 404 });
  }

  // 3) Transacción: crear cita, marcar aceptada y rechazar las demás
  const result = await prisma.$transaction(async (tx) => {
    // 3a) Crear la cita
    const nuevaCita = await tx.cita.create({
      data: {
        turno:       { connect: { id: sol.turnoId } },
        paciente:    { connect: { usuarioId: sol.pacienteId } },
        tipoDeCita,
        observaciones,
      },
      include: {
        turno:    true,
        paciente: { select: { nombres: true, apellidos: true } },
      },
    });

    // 3b) Actualizar esta solicitud a ACEPTADA
    await tx.solicitudCita.update({
      where: { id },
      data: { estado: "ACEPTADA" },
    });

    // 3c) Rechazar todas las otras pendientes para el mismo turno
    const otras = await tx.solicitudCita.findMany({
      where: {
        turnoId: sol.turnoId,
        estado:  "PENDIENTE",
        id:      { not: id },
      },
      select: { id: true },
    });
    const otrasIds = otras.map((o) => o.id);

    await tx.solicitudCita.updateMany({
      where: {
        turnoId: sol.turnoId,
        estado:  "PENDIENTE",
        id:      { not: id },
      },
      data: {
        estado:         "RECHAZADA",
        motivoRechazo: "Horario no disponible",
      },
    });

    return { nuevaCita, rechazadas: otrasIds };
  });

  // 4) Responder con la nueva cita y los IDs rechazados
  return NextResponse.json(result);
}
