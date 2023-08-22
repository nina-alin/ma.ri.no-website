import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const banner = await prisma.alert.findFirst();

  return NextResponse.json(banner);
}
