// app/api/notas/count/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  // Cuenta todas las notas clínicas
  const count = await prisma.notaClinica.count();
  return NextResponse.json({ count });
}
