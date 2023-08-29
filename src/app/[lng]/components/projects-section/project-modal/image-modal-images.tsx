import Image from "next/image";
import React, { useRef } from "react";

import styles from "@/app/[lng]/components/projects-section/project-modal/image-from-gallery.module.css";
import { PostWithType } from "@/types/posts";

interface ImageModalImagesProperties {
  currentIndex: number;
  posts: PostWithType[];
}

const ImageModalImages = ({
  currentIndex,
  posts,
}: ImageModalImagesProperties) => {
  const reference = useRef<HTMLDivElement>(null);

  const onWheel = (
    event: UIEvent & {
      deltaY: number;
    },
  ) => {
    const element = reference.current;
    if (element) {
      if (event.deltaY == 0) return;
      element.scrollTo({
        left: element.scrollLeft + event.deltaY,
      });
    }
  };

  return (
    <div
      id={"horizontalScroll"}
      className={styles.images}
      ref={reference}
      // @ts-ignore
      onWheel={onWheel}
    >
      <div className={styles.indexContainer}>
        <Image
          key={currentIndex}
          className={styles.imageModal}
          src={posts[currentIndex].mainImageUrl}
          alt={"main image from gallery"}
          width={100}
          height={100}
          unoptimized={true}
          data-horizontal-image
        />
        <div className={styles.index}>
          1/{posts[currentIndex].imagesUrl.length + 1}
        </div>
      </div>
      {posts[currentIndex].imagesUrl.map((image: string, index: number) => (
        <div key={image} className={styles.indexContainer}>
          <Image
            className={styles.imageModal}
            src={image}
            alt={"image from gallery"}
            width={100}
            data-horizontal-image
            height={100}
            unoptimized={true}
          />
          <div className={styles.index}>
            {index + 2}/{posts[currentIndex].imagesUrl.length + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageModalImages;
