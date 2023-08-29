"use client";

import LocomotiveScroll from "locomotive-scroll";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export const SmoothScrollContext = createContext<{
  scroll: LocomotiveScroll | null;
}>({
  scroll: null,
});
export const LocomotiveScrollAppProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (scroll) {
      // prevent resize issues
      new ResizeObserver(() => scroll.update()).observe(
        document.querySelector("[data-scroll-container]") as HTMLElement,
      );
    } else {
      (async () => {
        try {
          const loadedLocomotiveScroll = await import("locomotive-scroll");
          const LocomotiveScroll = loadedLocomotiveScroll.default;

          setScroll(
            new LocomotiveScroll({
              el: (document.querySelector("[data-scroll-container]") ??
                undefined) as HTMLElement,
              smooth: true,
              resetNativeScroll: true,
              multiplier: 0.4,
              touchMultiplier: 5,
              smartphone: {
                smooth: true,
              },
              tablet: {
                breakpoint: 0,
                smooth: true,
              },
            }),
          );
        } catch (error) {
          throw new Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    return () => {
      scroll && scroll.destroy();
    };
  }, [scroll]);

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

SmoothScrollContext.displayName = "SmoothScrollContext";
LocomotiveScrollAppProvider.displayName = "SmoothScrollProvider";
