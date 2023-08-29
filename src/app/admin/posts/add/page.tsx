import React from "react";

import AddPostForm from "@/app/admin/posts/components/add-post-form";
import { prisma } from "@/lib/prisma";

const PostAddPage = async () => {
  const types = await prisma.types.findMany();

  return <AddPostForm types={types} />;
};

export default PostAddPage;
