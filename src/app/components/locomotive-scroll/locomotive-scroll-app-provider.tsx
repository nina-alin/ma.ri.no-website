"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

export const SmoothScrollContext = createContext({
  scroll: null,
});
export const LocomotiveScrollAppProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [scroll, setScroll] = useState(null);

  useEffect(() => {
    if (scroll) {
      // prevent resize issues
      // @ts-ignore
      new ResizeObserver(() => scroll.update()).observe(
        // @ts-ignore
        document.querySelector("[data-scroll-container]"),
      );
    } else {
      (async () => {
        try {
          const loadedLocomotiveScroll = (await import(
              // @ts-ignore
              "locomotive-scroll"
            ));
          const LocomotiveScroll = loadedLocomotiveScroll.default;

          setScroll(
            new LocomotiveScroll({
              el:
                document.querySelector("[data-scroll-container]") ?? undefined,
              smooth: true,
              smoothMobile: true,
              resetNativeScroll: true,
              multiplier: 0.5,
            }),
          );
        } catch (error) {
          throw new Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    return () => {
      // @ts-ignore
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
