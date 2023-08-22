"use client";

import { ReactNode, useEffect, createContext, useState } from "react";

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
    if (!scroll) {
      (async () => {
        try {
          // @ts-ignore
          const LocomotiveScroll = (await import("locomotive-scroll")).default;

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
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    } else {
      // prevent resize issues
      // @ts-ignore
      new ResizeObserver(() => scroll.update()).observe(
        // @ts-ignore
        document.querySelector("[data-scroll-container]"),
      );
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
