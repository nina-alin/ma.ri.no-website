"use client";

import { Types } from "@prisma/client";
import { useContext } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import styles from "@/app/[lng]/components/projects-section/project-modal/image-from-gallery.module.css";
import { PostWithType } from "@/types/posts";

interface ImageModalHeaderProperties {
  textColor: string;
  posts: PostWithType[];
  currentIndex: number;
  onClose: () => void;
}

const ImageModalHeader = ({
  textColor,
  posts,
  currentIndex,
  onClose,
}: ImageModalHeaderProperties) => {
  const lng = useContext(LngContext);

  const displayTags = (type: Types[]) => {
    return type
      ?.map((tag) =>
        lng === "en" ? tag.nameEn : (lng === "fr" ? tag.nameFr : tag.nameJp),
      )
      .join(", ");
  };

  return (
    <div className={styles.header}>
      <div className={styles.titles}>
        <h3 className={styles.title} style={{ color: textColor }}>
          {lng === "en"
            ? posts[currentIndex].titleEn
            : (lng === "fr"
            ? posts[currentIndex].titleFr
            : posts[currentIndex].titleJp)}
        </h3>
        <p className={styles.subtitle} style={{ color: textColor }}>
          {posts[currentIndex].year} / {displayTags(posts[currentIndex].type)}
        </p>
      </div>
      <button
        className={styles.close}
        onClick={onClose}
        style={{ color: textColor }}
      >
        X
      </button>
    </div>
  );
};

export default ImageModalHeader;
