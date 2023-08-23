"use client";

import { useRouter } from "next/navigation";

import styles from "@/app/[lng]/page.module.css";
import AnimatedButton from "@/app/components/gsap/animated-button";
import ArrowRight from "@/app/components/svg/arrow-right";

const MoreButton = ({ moreTranslation }: { moreTranslation: string }) => {
  const router = useRouter();

  return (
    <AnimatedButton
      text={moreTranslation}
      id={"see-more"}
      icon={<ArrowRight />}
      className={styles.more}
      direction={"right"}
      onClick={() => router.push("/about-me")}
    />
  );
};

export default MoreButton;
