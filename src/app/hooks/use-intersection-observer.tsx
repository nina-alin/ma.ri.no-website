"use client";

import { useEffect } from "react";

type Args = {
  frameRef: React.RefObject<HTMLDivElement>;
  terminalRef: React.RefObject<HTMLDivElement>;
  intersectionCallBack: () => void;
};

const useIntersectionObserver = (args: Args) => {
  const { frameRef, terminalRef, intersectionCallBack } = args;

  useEffect(() => {
    if (!frameRef.current || !terminalRef.current) return;

    const options = {
      root: frameRef.current,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) intersectionCallBack();
    };

    const observer = new IntersectionObserver(callback, options);

    const target = terminalRef.current;

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [frameRef, terminalRef, intersectionCallBack]);
};

export default useIntersectionObserver;
