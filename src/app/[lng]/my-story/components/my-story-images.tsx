"use client";

import Image from "next/image";
import React, { useState } from "react";

import { ImageProperties } from "@/app/[lng]/my-story/page";
import Modal from "@/app/components/modal/modal";

import styles from "../page.module.css";

const MyStoryImages = ({ image }: { image: ImageProperties }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className={styles.imageText}>
        <Image
          onClick={() => setOpenModal(true)}
          src={image.src}
          alt={image.alt}
          width={5000}
          height={5000}
        />
        <p data-scroll data-scroll-speed={"1"}>
          {image.translation.toUpperCase()}
        </p>
      </div>
      {openModal && (
        <Modal open={openModal}>
          <h1>modal</h1>
        </Modal>
      )}
    </>
  );
};

export default MyStoryImages;
