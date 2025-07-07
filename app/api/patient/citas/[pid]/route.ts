// app/api/patient/citas/[pid]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { pid: string } }
) {
  const pacienteId = Number(params.pid);
  if (isNaN(pacienteId)) {
    return NextResponse.json([], { status: 400 });
  }

  const citas = await prisma.cita.findMany({
    where: {
      pacienteId,
      estado: "COMPLETADA",    // ← sólo las completadas
    },
    include: { turno: true },
    orderBy: { turno: { fecha: "desc" } },
  });

  return NextResponse.json(citas);
}
