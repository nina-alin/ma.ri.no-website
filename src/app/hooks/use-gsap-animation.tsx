"use client";

import gsap from "gsap";
import React, { RefObject } from "react";
import { useLayoutEffect } from "react";

interface UseGsapAnimationProperties {
  animationFunction: () => void;
  reference?: React.MutableRefObject<null> | RefObject<HTMLDivElement>;
  deps: any[];
}

const useGsapAnimation = ({
  animationFunction,
  reference,
  deps,
}: UseGsapAnimationProperties) =>
  useLayoutEffect(() => {
    const animation = gsap.context(
      () => animationFunction(),
      reference ?? undefined,
    );

    return () => animation.revert();
  }, deps);

export default useGsapAnimation;
