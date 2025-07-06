// app/api/turnos/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { EstadoTurno } from "@prisma/client";

const SLOT_MIN = 45;
const BREAK_MIN = 15;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const profesionalId = Number(searchParams.get("profesionalId"));
  const fechaParam   = searchParams.get("fecha"); // “YYYY-MM-DD”

  // 1) Parsear fecha en zona local
  let fecha: Date;
  if (fechaParam) {
    const [y, m, d] = fechaParam.split("-").map(Number);
    fecha = new Date(y, m - 1, d);
  } else {
    const now = new Date();
    fecha = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  // 2) Generar slots si aún no existen
  let turnos = await prisma.turno.findMany({
    where: { profesionalId, fecha },
  });
  if (turnos.length === 0) {
    const slots = [];
    let inicio = new Date(fecha);
    inicio.setHours(9, 0, 0, 0);
    for (let i = 0; i < 8; i++) {
      const fin = new Date(inicio.getTime() + SLOT_MIN * 60000);
      slots.push({
        profesionalId,
        fecha,
        horaInicio: inicio,
        horaFin:     fin,
        estado:      EstadoTurno.DISPONIBLE,
      });
      inicio = new Date(fin.getTime() + BREAK_MIN * 60000);
    }
    await prisma.turno.createMany({ data: slots });
  }

  // 3) Recabar IDs de turnos ya “ocupados”:
  //    - Con citas
  //    - Con solicitudes (pendientes o aceptadas)
  const ocupadosCita = await prisma.cita.findMany({
    where: { turno: { profesionalId, fecha } },
    select: { turnoId: true },
  });
  const ocupadosSolicitud = await prisma.solicitudCita.findMany({
    where: {
      turno: { profesionalId, fecha },
      estado: { in: ["PENDIENTE", "ACEPTADA"] },
    },
    select: { turnoId: true },
  });
  const ocupados = new Set<number>([
    ...ocupadosCita.map((c) => c.turnoId),
    ...ocupadosSolicitud.map((s) => s.turnoId),
  ]);

  // 4) Filtrar solo DISPONIBLES y que no estén en ese Set
  const libres = await prisma.turno.findMany({
    where: {
      profesionalId,
      fecha,
      estado: EstadoTurno.DISPONIBLE,
      id: { notIn: Array.from(ocupados) },
    },
    orderBy: { horaInicio: "asc" },
  });

  return NextResponse.json(libres);
}
