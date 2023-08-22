"use client";

import Image from "next/image";

import styles from "@/app/[lng]/components/projects-section/project-modal/image-from-gallery.module.css";

const ImagesInModal = ({ image }: { image: string }) => {
  return (
    <Image
      className={styles.imageModal}
      src={image}
      alt={"image from gallery"}
      width={"400"}
      height={"400"}
    />
  );
};

export default ImagesInModal;
