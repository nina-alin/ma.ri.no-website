"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";

import MyStoryModal from "@/app/[lng]/my-story/components/modal/my-story-modal";
import { ImageProperties } from "@/app/[lng]/my-story/page";
import Modal from "@/app/components/modal/modal";
import { MouseContext } from "@/app/components/mouse/mouse-context";

import styles from "../page.module.css";

const MyStoryImages = ({ image }: { image: ImageProperties }) => {
  const [openModal, setOpenModal] = useState(false);

  const { handleMouseEnter, handleMouseLeave } = useContext(MouseContext);

  return (
    <>
      <div
        className={styles.imageText}
        onClick={(event) => {
          setOpenModal(true);
          handleMouseLeave(event);
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image src={image.src} alt={image.alt} width={1000} height={1000} />
        <p data-scroll data-scroll-speed={"0.5"}>
          {image.translation.toUpperCase()}
        </p>
      </div>
      {openModal && (
        <Modal open={openModal}>
          <MyStoryModal onClose={() => setOpenModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default MyStoryImages;
