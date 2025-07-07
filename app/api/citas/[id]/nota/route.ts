// app/api/citas/[id]/nota/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  // Extraemos id aguardando params
  const { id } = await params;
  const citaId = Number(id);

  const nota = await prisma.notaClinica.findFirst({
    where: { citaId },
    include: {
      cita: {
        include: {
          turno: true,
          paciente: { select: { nombres: true, apellidos: true } },
        },
      },
    },
  });

  return NextResponse.json(nota ?? null);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const citaId = Number(id);
  const { contenido } = await req.json();

  if (!contenido) {
    return NextResponse.json(
      { message: "Contenido requerido" },
      { status: 400 }
    );
  }

  const exists = await prisma.notaClinica.findFirst({ where: { citaId } });
  if (exists) {
    return NextResponse.json(
      { message: "Nota ya existe" },
      { status: 409 }
    );
  }

  const nuevaNota = await prisma.notaClinica.create({
    data: {
      contenido,
      cita: { connect: { id: citaId } },
    },
    include: {
      cita: {
        include: {
          turno: true,
          paciente: { select: { nombres: true, apellidos: true } },
        },
      },
    },
  });

  return NextResponse.json(nuevaNota);
}
