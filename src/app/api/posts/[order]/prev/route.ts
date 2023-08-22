import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { order: string } },
) => {
  const prev = await prisma.posts.findFirst({
    where: {
      order: parseInt(params.order) - 1,
    },
    include: {
      type: true,
    },
  });

  return NextResponse.json(prev);
};
