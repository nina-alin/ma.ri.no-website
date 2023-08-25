"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import { Snackbar } from "@/app/admin/components/see-posts/see-posts";
import styles from "@/app/admin/components/see-posts/see-posts.module.css";
import ArrowDown from "@/app/admin/components/svg/arrow-down";
import ArrowUp from "@/app/admin/components/svg/arrow-up";
import { PostWithType } from "@/types/posts";

interface SeePostsOrderProperties {
  posts: PostWithType[];
  post: PostWithType;
  setShowSnackbar: Dispatch<SetStateAction<Snackbar>>;
}

const SeePostsOrder = ({
  posts,
  post,
  setShowSnackbar,
}: SeePostsOrderProperties) => {
  const router = useRouter();
  const onChangeOrder = (order: number, post: PostWithType) => {
    const { type, ...postWithoutType } = post;
    fetch(`/api/posts/order/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...postWithoutType,
        order: order,
        previousOrder: post.order,
      }),
    }).then((response) => {
      if (response.status === 200) {
        router.refresh();
        setShowSnackbar({
          toggle: true,
          msg: "L'ordre a bien été modifié.",
          color: "#4caf50",
        });
      } else {
        setShowSnackbar({
          toggle: true,
          msg: "Une erreur est survenue lors de la modification de l'oeuvre.",
          color: "#f44336",
        });
      }
    });
  };

  return (
    <td className={styles.order}>
      {post.order === posts.length - 1 ? null : (
        <button onClick={() => onChangeOrder(post.order + 1, post)}>
          <ArrowUp />
        </button>
      )}
      {post.order === 0 ? null : (
        <button onClick={() => onChangeOrder(post.order - 1, post)}>
          <ArrowDown />
        </button>
      )}
    </td>
  );
};

export default SeePostsOrder;
