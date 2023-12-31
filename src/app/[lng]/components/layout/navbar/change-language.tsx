"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";

import styles from "./change-language.module.css";

interface ChangeLanguageProperties {
  language: {
    display: string;
    redirect: string;
  };
}

const ChangeLanguage = ({ language }: ChangeLanguageProperties) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <button
      className={styles.links}
      onClick={() =>
        router.push(
          `/${language.redirect}/${pathname.split("/").slice(2).join("/")}`,
        )
      }
    >
      {language.display}
    </button>
  );
};

export default ChangeLanguage;
