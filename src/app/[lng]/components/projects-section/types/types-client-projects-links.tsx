"use client";

import { Types } from "@prisma/client";
import { Dispatch, SetStateAction, useContext } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import styles from "@/app/[lng]/page.module.css";
import { useTranslation } from "@/app/i18n/client";
import { PostWithType } from "@/types/posts";

interface TypesClientProjectsLinksProperties {
  types: Types[];
  setChosenType: Dispatch<SetStateAction<string>>;
  setNumberOfPosts: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<PostWithType[]>>;
  chosenType: string;
}

const TypesClientProjectsLinks = ({
  types,
  setChosenType,
  setNumberOfPosts,
  setPosts,
  chosenType,
}: TypesClientProjectsLinksProperties) => {
  const lng = useContext(LngContext);
  const { t } = useTranslation(lng);

  const typeLang = (type: Types) =>
    lng === "en" ? type.nameEn : (lng === "fr" ? type.nameFr : type.nameJp);

  return (
    <div className={styles.projectsBannerLinks}>
      <span
        className={styles.underlineAnimation}
        style={{
          // @ts-ignore
          "--hover-transform": chosenType === "all" ? "scaleX(1)" : "scaleX(0)",
          "--hover-transform-origin":
            chosenType === "all" ? "bottom left" : "bottom right",
        }}
        onClick={async () => {
          setChosenType("all");
          setNumberOfPosts(6);
          setPosts(
            await fetch(`/api/posts`).then((response) => response.json()),
          );
        }}
      >
        {t("home.all").toLowerCase()}
      </span>
      {types.map((type) => (
        <span
          onClick={() => {
            setNumberOfPosts(6);
            setChosenType(type.id);
          }}
          key={type.id}
          className={styles.underlineAnimation}
          style={{
            // @ts-ignore
            "--hover-transform":
              chosenType === type.id ? "scaleX(1)" : "scaleX(0)",
            "--hover-transform-origin":
              chosenType === type.id ? "bottom left" : "bottom right",
          }}
        >
          {typeLang(type).toLowerCase()}
        </span>
      ))}
    </div>
  );
};

export default TypesClientProjectsLinks;
