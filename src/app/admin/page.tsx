import SeePosts from "@/app/admin/components/see-posts";
import { prisma } from "@/lib/prisma";
import { PostWithType } from "@/types/posts";

import styles from "./page.module.css";

const getPosts = async (): Promise<PostWithType[]> => {
  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    method: "GET",
    cache: "no-cache",
  });
  const posts = await data.json();

  return posts;
};

export default async function AdminPage() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <SeePosts posts={posts} />
    </main>
  );
}
