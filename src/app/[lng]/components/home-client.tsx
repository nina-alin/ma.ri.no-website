"use client";

import ScrollTrigger, { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

import ChosenTypeProvider from "@/app/[lng]/components/chosen-type/chosen-type-context";
import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";

const HomeClient = ({
  children,
  lng,
}: {
  children: React.ReactNode;
  lng: string;
}) => {
  const homeReference = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

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

  return (
    <div ref={homeReference}>
      <ChosenTypeProvider>
        <LngContext.Provider value={lng}>{children}</LngContext.Provider>
      </ChosenTypeProvider>
    </div>
  );
};

export default HomeClient;
