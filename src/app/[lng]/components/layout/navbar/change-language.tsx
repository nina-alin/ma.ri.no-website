"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./change-language.module.css";

interface ChangeLanguageProps {
  language: {
    display: string;
    redirect: string;
  };
}
const ChangeLanguage = ({ language }: ChangeLanguageProps) => {
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
