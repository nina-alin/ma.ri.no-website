import AddPostForm from "@/app/admin/components/add-post/add-post-form";
import SeePosts from "@/app/admin/components/see-posts";
import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import { signOut } from "next-auth/react";
export default async function AdminPage() {
  const posts = await prisma.posts.findMany({
    include: { type: true },
    orderBy: { order: "desc" },
  });
  return (
    <main className={styles.main}>
      <SeePosts posts={posts} />
    </main>
  );
}
