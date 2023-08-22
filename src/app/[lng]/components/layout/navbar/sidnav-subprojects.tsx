"use client";

import { ReactNode, useState } from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import ArrowDown from "@/app/components/svg/arrow-down";
import ArrowUp from "@/app/components/svg/arrow-up";
const SidnavSubprojects = ({ children }: { children: ReactNode }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <>
      <button
        className={styles.arrowDropdown}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        {openDropdown ? <ArrowUp /> : <ArrowDown />}
      </button>
      {openDropdown ? children : null}
    </>
  );
};

export default SidnavSubprojects;
