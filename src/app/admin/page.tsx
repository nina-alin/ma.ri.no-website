import SeePosts from "@/app/admin/components/see-posts/see-posts";
import { prisma } from "@/lib/prisma";
import { PostWithType } from "@/types/posts";

import styles from "./page.module.css";

const getPosts = async (): Promise<PostWithType[]> => {
  return prisma.posts.findMany({
    include: {
      type: true,
    },
    orderBy: {
      order: "desc",
    },
  });
};

export default async function AdminPage() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <SeePosts posts={posts} />
    </main>
  );
}
