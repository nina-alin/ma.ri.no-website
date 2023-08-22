import { Posts, Types } from "@prisma/client";

export type PostWithType = Posts & { type: Types[] };
export type PostWithTypeAndWithoutId = Omit<PostWithType, "id">;
export type PostWithoutOrderAndWithoutId = Omit<
  PostWithTypeAndWithoutId,
  "order"
>;
