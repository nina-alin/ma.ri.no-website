"use client";

import Image from "next/image";
import React, { useState } from "react";
import { createPortal } from "react-dom";

import SeePostsActions from "@/app/admin/components/see-posts/see-posts-actions";
import SeePostsHeading from "@/app/admin/components/see-posts/see-posts-heading";
import SeePostsOrder from "@/app/admin/components/see-posts/see-posts-order";
import Snackbar from "@/app/admin/components/snackbar/snackbar";
import { PostWithType } from "@/types/posts";

import styles from "./see-posts.module.css";

export type Language = "fr" | "en" | "ja";
export type SnackbarT = {
  toggle: boolean;
  msg: string;
  color: string;
};

interface SeePostsProperties {
  posts: PostWithType[];
}

const SeePosts = ({ posts }: SeePostsProperties) => {
  const [langTitle, setLangTitle] = useState<Language>("fr");
  const [langContent, setLangContent] = useState<Language>("fr");
  const [showSnackbar, setShowSnackbar] = useState<SnackbarT>({
    toggle: false,
    msg: "",
    color: "",
  });

  return (
    <table className={styles.table}>
      <SeePostsHeading
        setLangTitle={setLangTitle}
        setLangContent={setLangContent}
        langTitle={langTitle}
        langContent={langContent}
      />
      <tbody>
        {posts.map((post) => (
          <tr className={styles.tbody} key={post.id}>
            <SeePostsOrder
              posts={posts}
              post={post}
              setShowSnackbar={setShowSnackbar}
            />
            <td>
              {langTitle === "fr"
                ? post.titleFr
                : (langTitle === "en"
                ? post.titleEn
                : post.titleJp)}
            </td>
            <td>
              {langContent === "fr"
                ? post.contentFr
                : (langContent === "en"
                ? post.contentEn
                : post.contentJp)}
            </td>
            <td>
              <Image
                width={100}
                height={100}
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
                <Image
                  width={100}
                  height={100}
                  className={styles.imageSize}
                  key={image}
                  src={image}
                  alt={`${post.titleEn} secondary image`}
                />
              ))}
            </td>
            <SeePostsActions
              postId={post.id}
              setShowSnackbar={setShowSnackbar}
            />
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
