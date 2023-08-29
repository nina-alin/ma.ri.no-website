"use client";

import React, { useContext } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import styles from "@/app/[lng]/components/projects-section/project-modal/image-from-gallery.module.css";
import AnimatedButton from "@/app/components/gsap/animated-button";
import ArrowLeft from "@/app/components/svg/arrow-left";
import ArrowRight from "@/app/components/svg/arrow-right";
import { useTranslation } from "@/app/i18n/client";

interface ImageModalActionsProperties {
  currentIndex: number;
  numberOfPosts: number;
  goToPrevious: () => void;
  goToNext: () => void;
  textColor: string;
}

const ImageModalActions = ({
  currentIndex,
  numberOfPosts,
  goToPrevious,
  goToNext,
  textColor,
}: ImageModalActionsProperties) => {
  const lng = useContext(LngContext);
  const { t } = useTranslation(lng);

  return (
    <div className={styles.actions}>
      {currentIndex === 0 ? (
        <div />
      ) : (
        <AnimatedButton
          text={t("home.modal.previous")}
          id={"previous-project"}
          className={styles.button}
          icon={<ArrowLeft color={textColor} />}
          onClick={goToPrevious}
          style={{ color: textColor, border: `2px solid ${textColor}` }}
          direction={"left"}
        />
      )}
      {currentIndex + 1 !== numberOfPosts && (
        <AnimatedButton
          text={t("home.modal.next")}
          id={"next-project"}
          className={styles.button}
          icon={<ArrowRight color={textColor} />}
          onClick={goToNext}
          style={{ color: textColor, border: `2px solid ${textColor}` }}
          direction={"right"}
        />
      )}
    </div>
  );
};

export default ImageModalActions;
