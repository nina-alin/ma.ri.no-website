"use client";

import Image from "next/image";
import { useContext, useEffect, useState } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import ImageModal from "@/app/[lng]/components/projects-section/project-modal/image-modal";
import Modal from "@/app/components/modal/modal";
import { PostWithType } from "@/types/posts";

import styles from "./image-from-gallery.module.css";

interface ImageFromGalleryProperties {
  post: PostWithType;
  posts: PostWithType[];
  numberOfPosts: number;
}

const ImageFromGallery = ({
  post,
  posts,
  numberOfPosts,
}: ImageFromGalleryProperties) => {
  const lng = useContext(LngContext);
  const [open, setOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setCurrentIndex(posts.findIndex((p) => p.id === post.id));
  }, [posts, post.id]);

  return (
    <div className={styles.image}>
      <Image
        className={styles.imageDisplayed}
        src={post.mainImageUrl}
        alt={post.titleEn}
        width={100}
        height={100}
        unoptimized={true}
      />
      <h3
        className={styles.text}
        data-scroll
        data-scroll-speed="1"
        data-scroll-delay="0.2"
        // hover color is set in css
        // @ts-ignore
        style={{ "--hover-color": post.displayColor }}
        onClick={() => setOpen(true)}
      >
        {lng === "en"
          ? post.titleEn
          : (lng === "fr"
          ? post.titleFr
          : post.titleJp)}
      </h3>
      {open && (
        <Modal open={true}>
          <ImageModal
            onClose={onClose}
            posts={posts}
            goToPrevious={goToPrevious}
            goToNext={goToNext}
            currentIndex={currentIndex}
            numberOfPosts={numberOfPosts}
          />
        </Modal>
      )}
    </div>
  );
};
export default ImageFromGallery;
