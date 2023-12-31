"use client";

import { gsap, Power1, Power2 } from "gsap";
import React, { ReactNode, useEffect, useLayoutEffect, useRef } from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import useGsapAnimation from "@/app/hooks/use-gsap-animation";

const NavbarAnimations = ({
  openMenu,
  isPlayAnimation,
  reversed,
  children,
}: {
  children: ReactNode;
  openMenu: () => void;
  isPlayAnimation: boolean;
  reversed: boolean;
}) => {
  const navReference = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>();

  // navbar fade in
  useGsapAnimation({
    animationFunction: () => {
      gsap.from("nav", {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      });
      gsap.from("#hamburger", {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      });
    },
    reference: navReference,
    deps: [],
  });

  // sidenav animation
  useGsapAnimation({
    animationFunction: () => {
      if (isPlayAnimation) {
        const burgerTop = document.querySelector("#burger-top");
        const burgerBottom = document.querySelector("#burger-bottom");

        tl.current && tl.current.progress(0).kill();

        tl.current = gsap
          .timeline({ reversed: true })
          .timeScale(1)
          .to(burgerTop, {
            y: 11,
            yoyo: true,
            ease: Power1.easeInOut,
            duration: 0.7,
          })
          .to(
            burgerBottom,
            {
              y: -11,
              yoyo: true,
              ease: Power1.easeInOut,
              duration: 0.7,
            },
            "-=0.7",
          )
          .to(burgerTop, {
            rotation: 585,
            duration: 1,
          })
          .to(
            document.querySelector("#burger-middle"),
            { rotation: 585, duration: 1 },
            "-=1",
          )
          .to(burgerBottom, { rotation: 675, duration: 1 }, "-=1")
          .to(document.querySelectorAll("[data-burger]"), {
            css: { borderColor: "#fff" },
            ease: Power1.easeOut,
            duration: 0.1,
          })
          .to(
            document.querySelector("#burger-sidebar"),
            {
              css: { marginLeft: "-10vw" },
              ease: Power2.easeOut,
              duration: 0.5,
            },
            "-=1",
          );
      }
    },
    reference: navReference,
    deps: [isPlayAnimation, reversed],
  });

  useEffect(() => {
    tl.current?.reversed(reversed);
  }, [reversed]);

  return (
    <div className={styles.navContainer} ref={navReference}>
      <button
        id={"hamburger"}
        className={styles.hamburger}
        onClick={openMenu}
        data-scroll
        data-scroll-speed="3"
        data-scroll-position="top"
      >
        <span
          data-burger
          id={"burger-top"}
          className={styles.burgerPiece}
        ></span>
        <span
          data-burger
          id={"burger-middle"}
          className={styles.burgerPiece}
        ></span>
        <span
          data-burger
          id={"burger-bottom"}
          className={styles.burgerPiece}
        ></span>
      </button>
      {children}
    </div>
  );
};

export default NavbarAnimations;
