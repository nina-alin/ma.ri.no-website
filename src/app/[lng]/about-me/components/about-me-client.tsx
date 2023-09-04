"use client";

import { gsap } from "gsap";
import React from "react";

import useGsapAnimation from "@/app/hooks/use-gsap-animation";

const AboutMeClient = ({ children }: { children: React.ReactNode }) => {
  useGsapAnimation({
    animationFunction: () => {
      gsap
        .timeline()
        .to("#color1", {
          y: -100,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.2,
        })
        .to(
          "#color2",
          {
            y: -100,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            stagger: 0.2,
          },
          "-=1",
        );
    },
    deps: [],
  });

  return <>{children}</>;
};

export default AboutMeClient;
