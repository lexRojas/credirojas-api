import { NextRequest, NextResponse } from "next/server";
import { prisma } from "./prisma";
// @typescript-eslint/no-explicit-any
export async function readJson<T = any>(req: NextRequest): Promise<T> {
  try {
    return await req.json();
  } catch {
    return {} as T;
  }
}

export async function listHandler(
  req: NextRequest,
  modelName: keyof typeof prisma,
  defaultOrderBy?: Record<string, "asc" | "desc">
) {
  const url = new URL(req.url);
  const take = Number(url.searchParams.get("take") ?? undefined);
  const skip = Number(url.searchParams.get("skip") ?? "0");
  const id = url.searchParams.get("id");
  const where = id ? { where: { id: Number(id) } } : {};
  // @ts-expect-error porque si
  const data = await prisma[modelName].findMany({
    ...where,
    take,
    skip,
    orderBy: defaultOrderBy,
  });
  return NextResponse.json(data);
}

export async function createHandler(
  req: NextRequest,
  modelName: keyof typeof prisma
) {
  const body = await readJson(req);
  // @ts-expect-error porque si
  const created = await prisma[modelName].create({ data: body });
  return NextResponse.json(created, { status: 201 });
}
