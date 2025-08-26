import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function pk(id: number) {
  return { idVariable: id }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (Number.isNaN(id)) return NextResponse.json({ error: 'id inválido' }, { status: 400 })
  const item = await prisma.variables.findUnique({ where: pk(id) })
  if (!item) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(item)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (Number.isNaN(id)) return NextResponse.json({ error: 'id inválido' }, { status: 400 })
  const data = await req.json()
  const updated = await prisma.variables.update({ where: pk(id), data })
  return NextResponse.json(updated)
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  if (Number.isNaN(id)) return NextResponse.json({ error: 'id inválido' }, { status: 400 })
  await prisma.variables.delete({ where: pk(id) })
  return NextResponse.json({ ok: true })
}
