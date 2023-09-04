"use client";

import React, { useState } from "react";

import LangageDropdown from "@/app/[lng]/components/layout/navbar/langage-dropdown";
import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import useHoverButtonMouse from "@/app/components/gsap/hover-button-mouse";
import { useTranslation } from "@/app/i18n/client";

const RightSideOfNavbar = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useHoverButtonMouse(`#contact`, isHovered);

  return (
    <div
      className={styles.buttons}
      data-scroll
      data-scroll-speed="3"
      data-scroll-position="top"
    >
      <button
        id={"contact"}
        className={styles.contact}
        onClick={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {t("navbar.buttons.contact-me")}
      </button>
      <LangageDropdown />
    </div>
  );
};

export default RightSideOfNavbar;
