import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const posts = await prisma.posts.count({
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
