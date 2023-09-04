"use client";

import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import ImageModal from "@/app/[lng]/components/projects-section/project-modal/image-modal";
import { SmoothScrollContext } from "@/app/components/locomotive-scroll/locomotive-scroll-app-provider";
import Modal from "@/app/components/modal/modal";
import { MouseContext } from "@/app/components/mouse/mouse-context";
import { PostWithType } from "@/types/posts";

import styles from "./image-from-gallery.module.css";

interface ImageFromGalleryProperties {
  post: PostWithType;
  posts: PostWithType[];
  numberOfPosts: number;
  index: number;
}

const applyDataScroll = (index: number) => {
  switch (0) {
    case index % 3: {
      return "4";
    }
    case (index - 1) % 3: {
      return "2";
    }
    case (index - 2) % 3: {
      return "3";
    }
  }
};

const ImageFromGallery = ({
  post,
  posts,
  index,
  numberOfPosts,
}: ImageFromGalleryProperties) => {
  const lng = useContext(LngContext);
  const { scroll } = useContext(SmoothScrollContext);
  const { setImageURL, handleMouseImage, handleMouseLeave } =
    useContext(MouseContext);

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
    if (scroll) {
      scroll.start();
    }
  };

  useEffect(() => {
    setCurrentIndex(posts.findIndex((p) => p.id === post.id));
  }, [posts, post.id]);

  return (
    <div
      className={styles.image}
      data-scroll
      data-scroll-speed={applyDataScroll(index)}
    >
      <LazyLoadImage
        className={styles.imageDisplayed}
        src={post.mainImageUrl}
        alt={post.titleEn}
      />
      <h3
        data-scroll
        data-scroll-speed={"2"}
        className={styles.text} // hover color is set in css
        // @ts-ignore
        style={{ "--hover-color": post.displayColor }}
        onClick={(event) => {
          setOpen(true);
          if (scroll) {
            scroll.stop();
          }
          handleMouseLeave(event);
          setImageURL(null);
        }}
        onMouseEnter={(event) => {
          setImageURL(post.imagesUrl[0]);
          handleMouseImage(event);
        }}
        onMouseLeave={(event) => {
          handleMouseLeave(event);
          setImageURL(null);
        }}
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
