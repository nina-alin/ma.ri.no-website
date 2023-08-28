"use client";

import { useContext } from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import { TransitionContext } from "@/app/components/transition-handler/transition-provider";
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
  const { url, setUrl } = useContext(TransitionContext);

  const handleClick = (linkHref: string) => {
    if (onClose) {
      onClose();
    }

    setUrl(`/${lng}/${linkHref}`);
  };

  return (
    <>
      {links.map((link) => (
        <button
          onClick={() => handleClick(link.href)}
          data-side-text
          className={styles.menuLinks}
          key={link.translation}
        >
          {t(`navbar.links.${link.translation}`)}
        </button>
      ))}
    </>
  );
};

export default MapLinks;
