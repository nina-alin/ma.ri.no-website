"use client";

import { gsap, Power1 } from "gsap";
import { useRouter } from "next/navigation";
import React, { ReactNode, useContext, useEffect, useRef } from "react";

import { SmoothScrollContext } from "@/app/components/locomotive-scroll/locomotive-scroll-app-provider";
import { TransitionContext } from "@/app/components/transition-handler/transition-provider";

import styles from "./transition-handler.module.css";

export default function TransitionHandler({
  children,
}: {
  children: ReactNode;
}) {
  const { scroll } = useContext(SmoothScrollContext);
  const elementReference = useRef(null);
  const firstLoadReference = useRef(true);

  const router = useRouter();

  const { url } = useContext(TransitionContext);

  useEffect(() => {
    let animation = null as gsap.Context | null;
    if (!firstLoadReference.current && scroll) {
      router.prefetch(url);
      animation = gsap.context(() => {
        gsap
          .timeline()
          .to("#blacklayer", {
            onStart: () => {
              scroll.stop();
            },
            duration: 2,
            ease: Power1.easeInOut,
            css: { left: "200vw" },
          })
          .to(
            "#whitelayer",
            {
              onStart: () => router.push(url),
              duration: 2,
              ease: Power1.easeInOut,
              css: { left: "200vw", width: "200%" },
            },
            "-=1.5",
          )
          .to("#blacklayer", {
            duration: 0.05,
            onStart: () => {
              scroll.start();
            },
            css: { width: "0vw" },
          })
          .to("#whitelayer", {
            duration: 0.05,
            css: { width: "0vw" },
          });
      });
    }
    firstLoadReference.current = false;

    return () => {
      if (animation && !firstLoadReference.current && animation.revert) {
        animation.revert();
      }
    };
  }, [router, url, firstLoadReference]);

  return (
    <div ref={elementReference}>
      <div id={"blacklayer"} className={styles.blackLayer}></div>
      <div id={"whitelayer"} className={styles.whiteLayer}></div>
      <div>{children}</div>
    </div>
  );
}
