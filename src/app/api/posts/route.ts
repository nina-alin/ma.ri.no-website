import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const posts = await prisma.posts.findMany({
    include: {
      type: true,
    },
    ...(url.searchParams.get("take") && {
      take: Number.parseInt(url.searchParams.get("take") as string),
    }),
    orderBy: {
      order: "desc",
    },
  });

  return NextResponse.json(posts);
}
export async function POST(request: Request) {
  const { type, ...data } = await request.json();

  const posts = await prisma.posts.findMany({
    orderBy: {
      order: "desc",
    },
  });

  const post = await prisma.posts.create({
    data: {
      ...data,
      type: {
        connect: type.map((type: any) => ({ id: type.id })),
      },
      order: posts.length,
    },
  });

  return NextResponse.json(post);
}

export async function PUT(request: Request) {
  const { type, ...data } = await request.json();

  const post = await prisma.posts.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
      type: {
        connect: type.map((type: any) => ({ id: type.id })),
      },
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(request: Request) {
  const data = await request.json();

  const post = await prisma.posts.delete({
    where: {
      id: data.id,
    },
  });

  return NextResponse.json(post);
}
