"use client";

import { gsap, Power1, Power2 } from "gsap";
import {
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { SmoothScrollContext } from "@/app/components/locomotive-scroll/locomotive-scroll-app-provider";

const NavbarAnimations = ({ children }: { children: ReactNode }) => {
  const { scroll } = useContext(SmoothScrollContext);

  const [reversed, setReversed] = useState(false);
  const [isPlayAnimation, setIsPlayAnimation] = useState(false);

  const navReference = useRef<HTMLDivElement>(null);
  const tl = useRef<GSAPTimeline>();

  const openMenu = () => {
    setIsPlayAnimation(true);
    setReversed(!reversed);
    if (scroll) {
      // TODO
      // @ts-ignore
      document.body.style.overflow = reversed ? scroll.stop() : scroll.start();
    }
  };

  // navbar fade in
  useLayoutEffect(() => {
    const animation = gsap.context(() => {
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
    }, navReference);

    return () => animation.revert();
  }, []);

  // sidenav animation
  useLayoutEffect(() => {
    const animation = gsap.context(() => {
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
    }, navReference);

    return () => animation.revert();
  }, [isPlayAnimation, reversed]);

  useEffect(() => {
    tl.current?.reversed(reversed);
  }, [reversed]);

  return (
    <div className={styles.navContainer} ref={navReference}>
      <button id={"hamburger"} className={styles.hamburger} onClick={openMenu}>
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
