import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const posts = await prisma.posts.findMany({
    include: {
      type: true,
    },
    orderBy: {
      year: "desc",
    },
    where: {
      type: {
        some: {
          id: params.id,
        },
      },
    },
  });

  return NextResponse.json(posts);
}
