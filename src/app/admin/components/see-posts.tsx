"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./see-posts.module.css";
import Image from "next/image";
import PenIcon from "@/app/admin/components/svg/pen-icon";
import DeleteIcon from "@/app/admin/components/svg/delete-icon";
import { createPortal } from "react-dom";
import Snackbar from "@/app/admin/components/snackbar/snackbar";
import { useRouter } from "next/navigation";
import ArrowUp from "@/app/admin/components/svg/arrow-up";
import ArrowDown from "@/app/admin/components/svg/arrow-down";
import { PostWithType } from "@/types/posts";

type Language = "fr" | "en" | "ja";

interface Props {
  posts: PostWithType[];
}
const SeePosts = ({ posts }: Props) => {
  const router = useRouter();
  const [langTitle, setLangTitle] = useState<Language>("fr");
  const [langContent, setLangContent] = useState<Language>("fr");
  const [showSnackbar, setShowSnackbar] = useState({
    toggle: false,
    msg: "",
    color: "",
  });

  const onDelete = (postId: string) => {
    fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ id: postId }),
    }).then((res) => {
      if (res.status === 200) {
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

  const onChangeOrder = (order: number, post: PostWithType) => {
    const { type, ...postWithoutType } = post;
    fetch(`/api/posts/order/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...postWithoutType,
        order: order,
        previousOrder: post.order,
      }),
    }).then((res) => {
      if (res.status === 200) {
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
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th>Ordre</th>
          <th>
            <select
              className={styles.select}
              value={langTitle}
              onChange={(event) => setLangTitle(event.target.value as Language)}
            >
              <option value="fr">Titre Français</option>
              <option value="en">Titre Anglais</option>
              <option value="ja">Titre Japonais</option>
            </select>
          </th>
          <th>
            <select
              className={styles.select}
              value={langContent}
              onChange={(event) =>
                setLangContent(event.target.value as Language)
              }
            >
              <option value="fr">Contenu Français</option>
              <option value="en">Contenu Anglais</option>
              <option value="ja">Contenu Japonais</option>
            </select>
          </th>
          <th>Image Principale</th>
          <th>Couleur</th>
          <th>Type</th>
          <th>Année</th>
          <th>Images</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr className={styles.tbody} key={post.id}>
            <td className={styles.order}>
              {post.order !== posts.length - 1 ? (
                <button onClick={() => onChangeOrder(post.order + 1, post)}>
                  <ArrowUp />
                </button>
              ) : null}
              {post.order !== 0 ? (
                <button onClick={() => onChangeOrder(post.order - 1, post)}>
                  <ArrowDown />
                </button>
              ) : null}
            </td>
            <td>
              {langTitle === "fr"
                ? post.titleFr
                : langTitle === "en"
                ? post.titleEn
                : post.titleJp}
            </td>
            <td>
              {langContent === "fr"
                ? post.contentFr
                : langContent === "en"
                ? post.contentEn
                : post.contentJp}
            </td>
            <td>
              <img
                className={styles.imageSize}
                src={post.mainImageUrl}
                alt={`${post.titleEn} image`}
              />
            </td>
            <td className={styles.displayColorTd}>
              <div
                className={styles.displayColor}
                style={{ backgroundColor: post.displayColor }}
              />
            </td>
            <td>{post.type.map((t) => t.nameFr).join(", ")}</td>
            <td>{post.year}</td>
            <td>
              {post.imagesUrl.map((image: string) => (
                <img
                  className={styles.imageSize}
                  key={image}
                  src={image}
                  alt={`${post.titleEn} secondary image`}
                />
              ))}
            </td>
            <td>
              <div className={styles.flexContainer}>
                <Link className={styles.svg} href={`/admin/posts/${post.id}`}>
                  <PenIcon />
                </Link>
                <div className={styles.svg} onClick={() => onDelete(post.id)}>
                  <DeleteIcon />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      {showSnackbar.toggle &&
        createPortal(
          <Snackbar
            dismiss={() =>
              setShowSnackbar({ toggle: false, msg: "", color: "" })
            }
            message={showSnackbar.msg}
            color={showSnackbar.color}
          />,
          document.body,
        )}
    </table>
  );
};

export default SeePosts;
