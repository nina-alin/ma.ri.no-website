"use client";

import { gsap, Power1 } from "gsap";
import { useRouter } from "next/navigation";
import React, { ReactNode, useContext, useEffect, useRef } from "react";

import { TransitionContext } from "@/app/components/transition-handler/transition-provider";

import styles from "./transition-handler.module.css";

export default function TransitionHandler({
  children,
}: {
  children: ReactNode;
}) {
  const elementReference = useRef(null);
  const firstLoadReference = useRef(true);

  const router = useRouter();

  const { url } = useContext(TransitionContext);

  useEffect(() => {
    let animation = null as gsap.Context | null;
    if (!firstLoadReference.current) {
      router.prefetch(url);
      animation = gsap.context(() => {
        gsap
          .timeline()
          .to("#blacklayer", {
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
              css: { left: "200vw" },
            },
            "-=1.5",
          );
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
