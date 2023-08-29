"use client";

import React, { useContext, useEffect, useRef } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import styles from "@/app/[lng]/components/projects-section/project-modal/image-from-gallery.module.css";
import ImageModalActions from "@/app/[lng]/components/projects-section/project-modal/image-modal-actions";
import ImageModalHeader from "@/app/[lng]/components/projects-section/project-modal/image-modal-header";
import ImageModalImages from "@/app/[lng]/components/projects-section/project-modal/image-modal-images";
import { PostWithType } from "@/types/posts";
import pickColorBasedOnBackground from "@/utils/pick-color-based-on-background";

interface ImageModalProperties {
  onClose: () => void;
  posts: PostWithType[];
  goToPrevious: () => void;
  goToNext: () => void;
  currentIndex: number;
  numberOfPosts: number;
}

const ImageModal = ({
  onClose,
  posts,
  goToPrevious,
  goToNext,
  currentIndex,
  numberOfPosts,
}: ImageModalProperties) => {
  const modalReference = useRef<HTMLDivElement>(null);
  const lng = useContext(LngContext);

  const textColor = pickColorBasedOnBackground(
    posts[currentIndex].displayColor,
  );

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <div
      id={"container"}
      className={styles.modalContent}
      onClick={() => onClose()}
    >
      <div
        ref={modalReference}
        className={styles.modal}
        style={{ backgroundColor: posts[currentIndex].displayColor }}
        onClick={(event) => event.stopPropagation()}
      >
        <ImageModalHeader
          textColor={textColor}
          posts={posts}
          currentIndex={currentIndex}
          onClose={onClose}
        />
        <ImageModalImages currentIndex={currentIndex} posts={posts} />
        <div className={styles.description} style={{ color: textColor }}>
          {lng === "en"
            ? posts[currentIndex].contentEn
            : (lng === "fr"
            ? posts[currentIndex].contentFr
            : posts[currentIndex].contentJp)}
        </div>
        <ImageModalActions
          currentIndex={currentIndex}
          numberOfPosts={numberOfPosts}
          goToPrevious={goToPrevious}
          goToNext={goToNext}
          textColor={textColor}
        />
      </div>
    </div>
  );
};

export default ImageModal;
