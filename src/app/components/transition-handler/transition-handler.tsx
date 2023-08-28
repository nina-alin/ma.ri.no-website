"use client";

import { gsap, Power1 } from "gsap";
import { useRouter } from "next/navigation";
import { ReactNode, useContext, useEffect, useRef } from "react";

import { TransitionContext } from "@/app/components/transition-handler/transition-provider";

import styles from "./transition-handler.module.css";

export default function TransitionHandler({
  children,
}: {
  children: ReactNode;
}) {
  const elementReference = useRef(null);
  const firstLoadReference = useRef(true);
  const pageTransitionReference = useRef(null);
  const router = useRouter();
  const { url, setUrl } = useContext(TransitionContext);

  useEffect(() => {
    if (!firstLoadReference.current) {
      const element = elementReference.current;

      // TODO: add transition
      const onPageExit = (element: null) => {
        router.prefetch(url);
        gsap.set(element, { autoAlpha: 1, yPercent: 0 });
        gsap
          .timeline({
            paused: true,
            onComplete: () => onPageEnter(element, url),
          })
          .to(pageTransitionReference, {
            css: { right: 0 },
          })
          .play();
      };

      const onPageEnter = (element: null, url: string) => {
        router.push(url);

        /*
                                                gsap
                                                  .timeline({
                                                    paused: true,
                                                    onStart: () => router.push(url),
                                                    delay: 0.5,
                                                    defaults: {
                                                      ease: Power1.easeOut,
                                                      duration: 1,
                                                    },
                                                  })
                                                  .to(element, {
                                                    opacity: 0,
                                                    xPercent: 0,
                                                  })
                                                  .play();
                                              */
      };

      onPageExit(element);
    }
    firstLoadReference.current = false;
  }, [router, url, firstLoadReference]);

  return (
    <>
      <div
        ref={pageTransitionReference}
        className={styles.pageTransition}
      ></div>
      <div ref={elementReference}>{children}</div>
    </>
  );
}
