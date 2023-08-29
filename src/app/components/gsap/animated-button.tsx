"use client";

import gsap from "gsap";
import React, { HTMLAttributes, ReactNode, useEffect, useState } from "react";

type AnimatedButtonProperties = {
  text: string;
  id: string;
  icon?: ReactNode;
  className: HTMLAttributes<HTMLButtonElement>["className"];
  onClick?: () => void;
  style?: React.CSSProperties;
  direction: string;
  dataScroll?: boolean;
};
const AnimatedButton = ({
  text,
  id,
  icon,
  className,
  onClick,
  style,
  direction,
  dataScroll,
}: AnimatedButtonProperties) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  useEffect(() => {
    if (isHover) {
      gsap.to(`#${id}`, {
        x: direction === "right" ? 10 : -10,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(`#${id}`, {
        x: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [direction, id, isHover]);

  return (
    <button
      style={style}
      id={id}
      onClick={onClick}
      className={className}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      data-scroll={dataScroll}
      data-scroll-speed={dataScroll ? "3" : undefined}
    >
      {direction === "right" ? (
        <>
          {text} {icon}
        </>
      ) : (
        <>
          {icon} {text}
        </>
      )}
    </button>
  );
};

export default AnimatedButton;
