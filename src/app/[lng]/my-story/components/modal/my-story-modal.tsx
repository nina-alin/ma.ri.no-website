import React, { useEffect, useRef } from "react";

import styles from "./my-story-modal.module.css";

type MyStoryModalProperties = {
  onClose: () => void;
};

const MyStoryModal = ({ onClose }: MyStoryModalProperties) => {
  const modalReference = useRef<HTMLDivElement>(null);

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
        onClick={(event) => event.stopPropagation()}
      >
        <h3>TEST</h3>
      </div>
    </div>
  );
};

export default MyStoryModal;
