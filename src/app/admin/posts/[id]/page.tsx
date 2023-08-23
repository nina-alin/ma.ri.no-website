import AddPostForm from "@/app/admin/posts/components/add-post-form";
import { prisma } from "@/lib/prisma";

const EditPostPage = async ({ params }: { params: { id: string } }) => {
  const post = await prisma.posts.findUnique({
    where: {
      id: params.id,
    },
    include: {
      type: true,
    },
  });
  const types = await prisma.types.findMany();

  if (!post) {
    return (
      <p>
        Oops! This post doesn&apos;t exist, or an issue occurred with the
        database.
      </p>
    );
  }

  return <AddPostForm post={post} types={types} />;
};

export default EditPostPage;
