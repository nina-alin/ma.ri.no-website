"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import styles from "@/app/[lng]/page.module.css";
import AnimatedButton from "@/app/components/gsap/animated-button";
import ArrowRight from "@/app/components/svg/arrow-right";
import { useTranslation } from "@/app/i18n/client";

const MoreButton = () => {
  const router = useRouter();
  const lng = useContext(LngContext);
  const { t } = useTranslation(lng);

  return (
    <AnimatedButton
      text={t("home.more")}
      id={"see-more"}
      icon={<ArrowRight />}
      className={styles.more}
      direction={"right"}
      onClick={() => router.push("/about-me")}
    />
  );
};

export default MoreButton;
