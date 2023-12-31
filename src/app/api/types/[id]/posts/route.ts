import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const url = new URL(request.url);

  const posts = await prisma.posts.findMany({
    include: {
      type: true,
    },
    ...(url.searchParams.get("take") && {
      take: Number.parseInt(url.searchParams.get("take") as string),
    }),
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
