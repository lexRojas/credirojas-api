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
  const take = Number(url.searchParams.get("take") ?? "999999999999999999");
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
  console.log(body);

  try {
    // @ts-expect-error porque si
    const created = await prisma[modelName].create({ data: body });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    // @ts-expect-error porque si
    if (error.code === "P2002") {
      // Si es un error de unicidad, devolver un mensaje adecuado
      return NextResponse.json(
        { error: "El valor de un campo único ya existe." },
        { status: 400 } // Puedes usar 400 (Bad Request) o el código que mejor se ajuste
      );
    }

    // Si el error es otro, devolver un error genérico
    console.error("Error de Prisma:", error);
    return NextResponse.json(
      { error: "Hubo un problema al procesar la solicitud." },
      { status: 500 }
    );
  }
}
