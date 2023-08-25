"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useContext, useState } from "react";

import MapLinks from "@/app/[lng]/components/layout/map-links";
import MapProjects from "@/app/[lng]/components/layout/map-projects";
import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import NavbarAnimations from "@/app/[lng]/components/layout/navbar/navbar-animations";
import { SmoothScrollContext } from "@/app/components/locomotive-scroll/locomotive-scroll-app-provider";
import { useTranslation } from "@/app/i18n/client";
import { fallbackLng } from "@/app/i18n/settings";

interface NavbarClientProperties {
  navbarLinks: ReactNode;
  children: ReactNode;
  langageDropdown: ReactNode;
}

// for client components
export const LngContext = createContext(fallbackLng);
const NavbarClient = ({
  children,
  langageDropdown,
}: NavbarClientProperties) => {
  const pathname = usePathname();
  const lng = pathname.split("/")[1];

  const { t } = useTranslation(lng);
  const { scroll } = useContext(SmoothScrollContext);

  const [isPlayAnimation, setIsPlayAnimation] = useState(false);
  const [reversed, setReversed] = useState(false);

  const openMenu = () => {
    setIsPlayAnimation(true);
    setReversed(!reversed);
    if (scroll) {
      // TODO
      // @ts-ignore
      document.body.style.overflow = reversed ? scroll.stop() : scroll.start();
    }
  };

  return (
    <NavbarAnimations
      isPlayAnimation={isPlayAnimation}
      reversed={reversed}
      openMenu={openMenu}
    >
      <LngContext.Provider value={lng}>
        <div className={styles.sidnav} id={"burger-sidebar"}>
          <div className={styles.sidnavLinks}>
            <MapLinks onClose={openMenu} />
            <Link key={"projects"} href={`${lng}/projects`} data-side-text>
              {t(`navbar.links.projects`)}
            </Link>
            <hr className={styles.hr} />
            <MapProjects lng={lng} />
          </div>
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
