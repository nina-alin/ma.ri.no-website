import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const types = await prisma.types.findMany();

  return NextResponse.json(types);
}
