"use client";

import { useRouter } from "next/navigation";

import styles from "@/app/[lng]/page.module.css";
import AnimatedButton from "@/app/components/gsap/animated-button";
import ArrowRight from "@/app/components/svg/arrow-right";

const DiscoverMyStoryButton = ({
  discoverTranslation,
}: {
  discoverTranslation: string;
}) => {
  const router = useRouter();

  return (
    <AnimatedButton
      text={discoverTranslation}
      id={"discover-my-story"}
      icon={<ArrowRight />}
      className={styles.discover}
      direction={"right"}
      onClick={() => router.push("/my-story")}
    />
  );
};

export default DiscoverMyStoryButton;
