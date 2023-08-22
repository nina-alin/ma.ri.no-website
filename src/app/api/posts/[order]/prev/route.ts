import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { order: string } },
) => {
  const previous = await prisma.posts.findFirst({
    where: {
      order: Number.parseInt(params.order) - 1,
    },
    include: {
      type: true,
    },
  });

  return NextResponse.json(previous);
};
