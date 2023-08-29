"use client";

import { gsap } from "gsap";
import React, { useLayoutEffect } from "react";

const AboutMeClient = ({ children }: { children: React.ReactNode }) => {
  useLayoutEffect(() => {
    const animation = gsap.context(() => {
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
    });

    return () => animation.revert();
  }, []);

  return <>{children}</>;
};

export default AboutMeClient;
