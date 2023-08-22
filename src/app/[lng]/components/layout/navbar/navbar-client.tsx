"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import Hamburger from "@/app/components/svg/hamburger";
import { fallbackLng } from "@/app/i18n/settings";

interface NavbarClientProperties {
  navbarLinks: ReactNode;
  children: ReactNode;
  langageDropdown: ReactNode;
}

// for client components
export const LngContext = createContext(fallbackLng);
const NavbarClient = ({ navbarLinks, children, langageDropdown }: NavbarClientProperties) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navReference = useRef(null);
  const pathname = usePathname();
  const lng = pathname.split("/")[1];
  const openMenu = () => {
    setIsMenuOpen(true);
    document.querySelectorAll("html")[0].style.overflow = "hidden";
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.querySelectorAll("html")[0].style.overflow = "auto";
  };

  useLayoutEffect(() => {
    const animation = gsap.context(() => {
      gsap.from("nav", {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      });
    }, navReference);

    return () => animation.revert();
  }, []);

  return (
    <div className={styles.navContainer} ref={navReference} data-scroll-section>
      <LngContext.Provider value={lng}>
        {isMenuOpen ? (
          <div className={styles.sidnav}>
            <button className={styles.closeSidnav} onClick={closeMenu}>
              x
            </button>
            {navbarLinks}
          </div>
        ) : null}
        <nav className={styles.navbar}>
          {children}
          <button className={styles.hamburger} onClick={openMenu}>
            <Hamburger />
          </button>
          {langageDropdown}
        </nav>
      </LngContext.Provider>
    </div>
  );
};

export default NavbarClient;
