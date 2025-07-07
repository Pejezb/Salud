// app/api/nota/[notaId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

  const updated = await prisma.notaClinica.update({
    where: { id: notaId },
    data: { contenido },
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
