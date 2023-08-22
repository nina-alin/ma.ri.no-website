import AddPostForm from "@/app/admin/components/add-post/add-post-form";
import { prisma } from "@/lib/prisma";

const PostAddPage = async () => {
  const types = await prisma.types.findMany();

  return <AddPostForm types={types} />;
};

export default PostAddPage;
