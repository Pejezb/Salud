// lib/auth.ts
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { NextResponse } from 'next/server'

export type SessionUser = {
  role: 'doctor' | 'patient'
  patientId?: number
}

// Obtiene la sesión o devuelve 401
export async function requireSession() {
  const session = await getServerSession(authOptions)
  if (!session) throw NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  return session.user as SessionUser
}

// Para GET de nota: doctor vé todo, paciente sólo suya
export function authorizeViewNota(
  user: SessionUser,
  notaPacienteId: number
) {
  if (user.role === 'doctor') return
  if (user.role === 'patient' && user.patientId === notaPacienteId) return
  throw NextResponse.json({ error: 'Prohibido' }, { status: 403 })
}

// Para mutaciones: sólo doctor
export function authorizeDoctor(user: SessionUser) {
  if (user.role !== 'doctor')
    throw NextResponse.json({ error: 'Prohibido' }, { status: 403 })
}
