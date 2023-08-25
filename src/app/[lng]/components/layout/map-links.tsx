"use client";

import Link from "next/link";
import { useContext } from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import { useTranslation } from "@/app/i18n/client";

const links = [
  {
    href: "",
    translation: "home",
  },
  {
    href: "about-me",
    translation: "about-me",
  },
  {
    href: "my-story",
    translation: "my-story",
  },
];

const MapLinks = ({ onClose }: { onClose?: () => void }) => {
  const lng = useContext(LngContext);
  const { t } = useTranslation(lng);

  return (
    <>
      {links.map((link) => (
        <Link
          onClick={onClose && onClose}
          data-side-text
          className={styles[link.translation]}
          key={link.translation}
          href={`/${lng}/${link.href}`}
        >
          {t(`navbar.links.${link.translation}`)}
        </Link>
      ))}
    </>
  );
};

export default MapLinks;
