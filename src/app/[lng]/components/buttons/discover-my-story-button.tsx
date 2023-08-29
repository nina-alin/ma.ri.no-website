"use client";

import { useRouter } from "next/navigation";
import React, { useContext } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import styles from "@/app/[lng]/page.module.css";
import AnimatedButton from "@/app/components/gsap/animated-button";
import ArrowRight from "@/app/components/svg/arrow-right";
import { useTranslation } from "@/app/i18n/client";

const DiscoverMyStoryButton = () => {
  const router = useRouter();
  const lng = useContext(LngContext);
  const { t } = useTranslation(lng);

  return (
    <AnimatedButton
      text={t("home.discover-my-story")}
      id={"discover-my-story"}
      icon={<ArrowRight />}
      className={styles.discover}
      direction={"right"}
      onClick={() => router.push("/my-story")}
    />
  );
};

export default DiscoverMyStoryButton;
