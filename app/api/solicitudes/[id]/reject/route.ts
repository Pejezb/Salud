// app/api/solicitudes/[id]/reject/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: number;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  let payload: JWTPayload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  } catch {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }

  // Sólo el doctor puede rechazar
  if (payload.userId !== 1) {
    return NextResponse.json({ message: "Sin permisos" }, { status: 403 });
  }

  const id = Number(params.id);
  const { motivo } = await req.json();

  const updated = await prisma.solicitudCita.update({
    where: { id },
    data: {
      estado:        "RECHAZADA",
      motivoRechazo: motivo ?? "Rechazada por el doctor",
    },
  });

  return NextResponse.json(updated);
}
