"use client";

import { Types } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useContext } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import styles from "@/app/[lng]/page.module.css";
import { useTranslation } from "@/app/i18n/client";
import { PostWithType } from "@/types/posts";
import getSearchParameters from "@/utils/get-search-parameters";

interface TypesClientProjectsLinksProperties {
  types: Types[];
  setNumberOfPosts: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<PostWithType[]>>;
}

const TypesClientProjectsLinks = ({
  types,
  setNumberOfPosts,
  setPosts,
}: TypesClientProjectsLinksProperties) => {
  const lng = useContext(LngContext);
  const { t } = useTranslation(lng);

  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  const chosenType = getSearchParameters(searchParameters);
  const typeLang = (type: Types) =>
    lng === "en" ? type.nameEn : (lng === "fr" ? type.nameFr : type.nameJp);

  return (
    <div className={styles.projectsBannerLinks}>
      <span
        className={styles.underlineAnimation}
        style={{
          // @ts-ignore
          "--hover-transform":
            !chosenType || chosenType === "all" ? "scaleX(1)" : "scaleX(0)",
          "--hover-transform-origin":
            !chosenType || chosenType === "all"
              ? "bottom left"
              : "bottom right",
        }}
        onClick={async () => {
          router.push(`${pathname}?projects=all`);
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
            router.push(`${pathname}?projects=${type.id}`);
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
