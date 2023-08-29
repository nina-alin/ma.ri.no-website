"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

import { SnackbarT } from "@/app/admin/components/see-posts/see-posts";
import styles from "@/app/admin/components/see-posts/see-posts.module.css";
import DeleteIcon from "@/app/admin/components/svg/delete-icon";
import PenIcon from "@/app/admin/components/svg/pen-icon";

interface SeePostsActionsProperties {
  setShowSnackbar: Dispatch<SetStateAction<SnackbarT>>;
  postId: string;
}

const SeePostsActions = ({
  setShowSnackbar,
  postId,
}: SeePostsActionsProperties) => {
  const router = useRouter();

  const onDelete = (postId: string) => {
    fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ id: postId }),
    }).then((response) => {
      if (response.status === 200) {
        router.refresh();
        setShowSnackbar({
          toggle: true,
          msg: "Le projet a bien été supprimé.",
          color: "#4caf50",
        });
      } else {
        setShowSnackbar({
          toggle: true,
          msg: "Une erreur est survenue.",
          color: "#f44336",
        });
      }
    });
  };

  return (
    <td>
      <div className={styles.flexContainer}>
        <Link className={styles.svg} href={`/admin/posts/${postId}`}>
          <PenIcon />
        </Link>
        <div className={styles.svg} onClick={() => onDelete(postId)}>
          <DeleteIcon />
        </div>
      </div>
    </td>
  );
};

export default SeePostsActions;
