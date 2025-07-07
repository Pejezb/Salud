// app/api/citas/[id]/nota/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const citaId = Number(id);
  if (isNaN(citaId)) return NextResponse.json(null, { status: 400 });

  const pid = req.headers.get("x-patient-id");
  const patientId = pid ? Number(pid) : undefined;

  const nota = await prisma.notaClinica.findFirst({
    where: {
      citaId,
      ...(patientId && { cita: { pacienteId: patientId } }),
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

  // Si pidió filtro de paciente y no hay nota → 403
  if (patientId && !nota) {
    return NextResponse.json({ error: "Prohibido" }, { status: 403 });
  }

  return NextResponse.json(nota ?? null);
}

export async function POST(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const citaId = Number(id);
  const { contenido } = await req.json();
  if (!contenido) {
    return NextResponse.json({ error: "Contenido requerido" }, { status: 400 });
  }
  if (await prisma.notaClinica.findFirst({ where: { citaId } })) {
    return NextResponse.json({ error: "Nota ya existe" }, { status: 409 });
  }
  const nueva = await prisma.notaClinica.create({
    data: { contenido, cita: { connect: { id: citaId } } },
    include: { cita: { include: { turno: true, paciente: true } } },
  });
  return NextResponse.json(nueva);
}
