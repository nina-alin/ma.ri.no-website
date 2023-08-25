"use client";

import { usePathname } from "next/navigation";
import { createContext, ReactNode } from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import NavbarAnimations from "@/app/[lng]/components/layout/navbar/navbar-animations";
import { fallbackLng } from "@/app/i18n/settings";

interface NavbarClientProperties {
  navbarLinks: ReactNode;
  children: ReactNode;
  langageDropdown: ReactNode;
}

// for client components
export const LngContext = createContext(fallbackLng);
const NavbarClient = ({
  navbarLinks,
  children,
  langageDropdown,
}: NavbarClientProperties) => {
  const pathname = usePathname();

  const lng = pathname.split("/")[1];

  return (
    <NavbarAnimations>
      <LngContext.Provider value={lng}>
        <div className={styles.sidnav} id={"burger-sidebar"}>
          {navbarLinks}
        </div>
        <nav className={styles.navbar}>
          {children}
          {langageDropdown}
        </nav>
      </LngContext.Provider>
    </NavbarAnimations>
  );
};

export default NavbarClient;
