import Link from "next/link";
import { signOut } from "next-auth/react";

import AddPostForm from "@/app/admin/components/add-post/add-post-form";
import SeePosts from "@/app/admin/components/see-posts";
import { prisma } from "@/lib/prisma";

import styles from "./page.module.css";
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