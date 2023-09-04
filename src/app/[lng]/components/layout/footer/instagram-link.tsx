"use client";

import Link from "next/link";
import React, { useContext } from "react";

import styles from "@/app/[lng]/components/layout/footer/footer.module.css";
import { MouseContext } from "@/app/components/mouse/mouse-context";
import Instagram from "@/app/components/svg/instagram";

const InstagramLink = () => {
  const { handleMouseEnter, handleMouseLeave } = useContext(MouseContext);

  return (
    <Link href={"https://www.instagram.com/ma.ri.no_studio/"}>
      <div
        className={styles.socials}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Instagram />
      </div>
    </Link>
  );
};

export default InstagramLink;
