import { NextRequest } from "next/server";
import { createHandler, listHandler } from "@/lib/crud";

export async function GET(req: NextRequest) {
  return listHandler(req, "variables", { idVariable: "desc" });
}
/**
 *
 * @param req
 * @returns la tabla ya creada.
 */
export async function POST(req: NextRequest) {
  return createHandler(req, "variables");
}
