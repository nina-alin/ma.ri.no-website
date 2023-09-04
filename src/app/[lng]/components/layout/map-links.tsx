"use client";

import React, { useContext } from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { MouseContext } from "@/app/components/mouse/mouse-context";
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

interface MapLinksProperties {
  lng: string;
  onClose?: () => void;
  handleMouseEnter?: () => void;
  handleMouseLeave?: () => void;
}

const MapLinks = ({
  lng,
  onClose,
  handleMouseEnter,
  handleMouseLeave,
}: MapLinksProperties) => {
  const { t } = useTranslation(lng);

  const { setUrl } = useContext(TransitionContext);

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
          onClick={(event) => {
            handleClick(link.href);
            handleMouseLeave && handleMouseLeave(event);
          }}
          onMouseEnter={handleMouseEnter && handleMouseEnter}
          onMouseLeave={handleMouseLeave && handleMouseLeave}
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
