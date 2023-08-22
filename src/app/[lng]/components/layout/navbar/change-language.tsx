"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./change-language.module.css";

interface ChangeLanguageProperties {
  language: {
    display: string;
    redirect: string;
  };
}

const ChangeLanguage = ({ language }: ChangeLanguageProperties) => {
  const pathname = usePathname();

  return (
    <Link
      className={styles.links}
      href={`${language.redirect}/${pathname.split("/").slice(2).join("/")}`}
    >
      {language.display}
    </Link>
  );
};

export default ChangeLanguage;
