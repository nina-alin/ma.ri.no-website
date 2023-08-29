import { StaticImageData } from "next/image";
import React from "react";

import MyStoryImages from "@/app/[lng]/my-story/components/my-story-images";
import { translate } from "@/app/i18n";

import asahikawa from "../../../../public/asahikawa.jpg";
import brussels from "../../../../public/brussels.jpg";
import catania from "../../../../public/catania.jpg";
import lille from "../../../../public/lille.jpg";
import styles from "./page.module.css";

export type ImageProperties = {
  src: StaticImageData;
  alt: string;
  translation: string;
};
const MyStoryPage = async ({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) => {
  const { t } = await translate(lng);

  const imagesFirstRow: ImageProperties[] = [
    {
      src: lille,
      alt: "lille",
      translation: t("my-story.lille"),
    },
    {
      src: brussels,
      alt: "brussels",
      translation: t("my-story.brussels"),
    },
  ];

  const imagesSecondRow: ImageProperties[] = [
    {
      src: catania,
      alt: "catania",
      translation: t("my-story.catania"),
    },
    {
      src: asahikawa,
      alt: "asahikawa",
      translation: t("my-story.asahikawa"),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.imagesContainer}>
        <div className={styles.images}>
          {imagesFirstRow.map((image) => (
            <MyStoryImages key={image.alt} image={image} />
          ))}
        </div>
        <div className={styles.images}>
          {imagesSecondRow.map((image) => (
            <MyStoryImages key={image.alt} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyStoryPage;
