"use client";

import { gsap } from "gsap";
import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import { SmoothScrollContext } from "@/app/components/locomotive-scroll/locomotive-scroll-app-provider";

const HomeClient = ({
  children,
  lng,
  projects,
}: {
  children: React.ReactNode;
  lng: string;
  projects: string | undefined;
}) => {
  const { scroll } = useContext(SmoothScrollContext);
  const homeReference = useRef(null);

  useLayoutEffect(() => {
    const animation = gsap.context(() => {
      gsap.from("#background-logo", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      });
      gsap.from("#logo", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      });
    }, homeReference);

    return () => animation.revert();
  }, []);

  useEffect(() => {
    if (scroll && projects !== undefined) {
      scroll.scrollTo(document.querySelector("#projects") as HTMLElement);
    }
  }, [scroll, projects]);

  return (
    <div ref={homeReference}>
      <LngContext.Provider value={lng}>{children}</LngContext.Provider>
    </div>
  );
};

export default HomeClient;
