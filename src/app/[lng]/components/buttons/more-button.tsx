"use client";

import { useRouter } from "next/navigation";
import React, { useContext } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import styles from "@/app/[lng]/page.module.css";
import AnimatedButton from "@/app/components/gsap/animated-button";
import { MouseContext } from "@/app/components/mouse/mouse-context";
import ArrowRight from "@/app/components/svg/arrow-right";
import { useTranslation } from "@/app/i18n/client";

const MoreButton = () => {
  const router = useRouter();

  const lng = useContext(LngContext);
  const { handleMouseButton, handleMouseLeave } = useContext(MouseContext);

  const { t } = useTranslation(lng);

  return (
    <AnimatedButton
      text={t("home.more")}
      id={"see-more"}
      icon={<ArrowRight />}
      className={styles.more}
      direction={"right"}
      onClick={(event) => {
        router.push("/about-me");
        handleMouseLeave(event);
      }}
      onMouseEnter={(event) => {
        handleMouseButton(event);
      }}
      onMouseLeave={(event) => {
        handleMouseLeave(event);
      }}
    />
  );
};

export default MoreButton;
