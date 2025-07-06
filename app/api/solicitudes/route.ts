// app/api/solicitudes/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

interface JWTPayload {
  userId: number;
  // otros campos que tengas en tu token…
}

const JWT_SECRET = process.env.JWT_SECRET!;

// Extrae el JWT de cookie o header y lo verifica, lanzando si no es válido
function verifyToken(req: NextRequest): JWTPayload {
  // 1) Intentar de la cookie "token"
  let token = req.cookies.get("token")?.value;

  // 2) Si no viene por cookie, mirar header Authorization
  if (!token) {
    const auth = req.headers.get("authorization") || "";
    if (auth.startsWith("Bearer ")) {
      token = auth.slice("Bearer ".length);
    }
  }

  if (!token) {
    throw new Error("No autorizado");
  }

  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    throw new Error("Token inválido");
  }
}

export async function GET(req: NextRequest) {
  let payload: JWTPayload;
  try {
    payload = verifyToken(req);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }

  const isDoctor = payload.userId === 1;
  let solicitudes;

  if (isDoctor) {
    solicitudes = await prisma.solicitudCita.findMany({
      where: { estado: "PENDIENTE" },
      include: {
        paciente: { select: { nombres: true, apellidos: true, dni: true } },
        turno: true,
      },
      orderBy: { fechaSolicitud: "desc" },
    });
  } else {
    solicitudes = await prisma.solicitudCita.findMany({
      where: { paciente: { usuarioId: payload.userId } },
      include: {
        paciente: { select: { nombres: true, apellidos: true, dni: true } },
        turno: true,
      },
      orderBy: { fechaSolicitud: "desc" },
    });
  }

  return NextResponse.json(solicitudes);
}

export async function POST(req: NextRequest) {
  let payload: JWTPayload;
  try {
    payload = verifyToken(req);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }

  const { turnoId, motivo } = await req.json();
  const pacienteId = payload.userId;

  // Evitar duplicados
  if (await prisma.solicitudCita.findUnique({ where: { turnoId } })) {
    return NextResponse.json(
      { message: "Ya existe una solicitud para ese turno" },
      { status: 409 }
    );
  }

  // Validar turno
  const turno = await prisma.turno.findUnique({ where: { id: turnoId } });
  if (!turno || turno.estado !== "DISPONIBLE") {
    return NextResponse.json(
      { message: "Turno no válido o no disponible" },
      { status: 400 }
    );
  }

  // Crear solicitud
  const nueva = await prisma.solicitudCita.create({
    data: {
      paciente: { connect: { usuarioId: pacienteId } },
      turno:    { connect: { id: turnoId } },
      motivo,
    },
    include: {
      paciente: { select: { nombres: true, apellidos: true, dni: true } },
      turno:    true,
    },
  });

  return NextResponse.json(nueva, { status: 201 });
}
