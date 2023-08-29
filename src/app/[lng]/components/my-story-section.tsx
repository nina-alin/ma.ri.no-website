import { TFunction } from "i18next";
import Image from "next/image";
import React from "react";

import DiscoverMyStoryButton from "@/app/[lng]/components/buttons/discover-my-story-button";
import styles from "@/app/[lng]/page.module.css";

import placeholder from "../../../../public/placeholder.png";

const MyStorySection = ({ t }: { t: TFunction }) => {
  return (
    <div className={styles.myStory}>
      <Image
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="4"
        src={placeholder}
        alt={"placeholder"}
        width={"700"}
        height={"600"}
      />
      <div className={styles.myStoryAbout}>
        <h2
          className={styles.myStoryTitle}
          data-scroll
          data-scroll-speed="2"
          data-scroll-delay="0.2"
        >
          {t("home.my-story")}
        </h2>
        <p
          className={styles.myStoryText}
          data-scroll
          data-scroll-speed="2"
          data-scroll-delay="0.2"
        >
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euis
        </p>
        <div>
          <DiscoverMyStoryButton />
        </div>
      </div>
    </div>
  );
};

export default MyStorySection;
