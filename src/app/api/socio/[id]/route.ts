import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function pk(id: number) {
  return { idSocio: id };
}

type Params = { id: string };

export async function GET(_req: NextRequest, ctx: { params: Promise<Params> }) {
  const { id } = await ctx.params; // ⬅️ ahora haces await
  const idNum = Number(id);

  if (Number.isNaN(idNum))
    return NextResponse.json({ error: "id inválido" }, { status: 400 });
  const item = await prisma.socio.findUnique({ where: pk(idNum) });
  if (!item)
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(_req: NextRequest, ctx: { params: Promise<Params> }) {
  const { id } = await ctx.params; // ⬅️ ahora haces await
  const idNum = Number(id);

  if (Number.isNaN(id))
    return NextResponse.json({ error: "id inválido" }, { status: 400 });
  const data = await _req.json();
  const updated = await prisma.socio.update({ where: pk(idNum), data });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  ctx: { params: Promise<Params> }
) {
  const { id } = await ctx.params; // ⬅️ ahora haces await
  const idNum = Number(id);
  if (Number.isNaN(idNum))
    return NextResponse.json({ error: "id inválido" }, { status: 400 });
  await prisma.socio.delete({ where: pk(idNum) });
  return NextResponse.json({ ok: true });
}
