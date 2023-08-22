import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const data = await request.json();
  const { previousOrder, ...rest } = data;

  try {
    if (previousOrder > data.order) {
      await prisma.posts.updateMany({
        where: {
          order: {
            equals: data.order,
          },
        },
        data: {
          order: {
            set: data.order + 1,
          },
        },
      });
    } else if (previousOrder < data.order) {
      await prisma.posts.updateMany({
        where: {
          order: {
            equals: data.order,
          },
        },
        data: {
          order: {
            set: data.order - 1,
          },
        },
      });
    }

    const post = await prisma.posts.update({
      where: {
        id: params.id,
      },
      data: {
        order: {
          set: rest.order,
        },
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.error();
  }
}
