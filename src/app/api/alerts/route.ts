import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const banner = await prisma.alert.findFirst();

  return NextResponse.json(banner);
}

export async function PUT(request: Request) {
  const body = await request.json();
  // eslint-disable-next-line no-unused-vars
  const { id, ...data } = body;

  const banner = await prisma.alert.update({
    where: {
      id: "1",
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json(banner);
}
