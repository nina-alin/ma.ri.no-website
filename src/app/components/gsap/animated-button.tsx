"use client";

import React, { HTMLAttributes, ReactNode, useState } from "react";

import useHoverButtonMouse from "@/app/components/gsap/hover-button-mouse";

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
  const [isHovered, setIsHovered] = useState(false);

  useHoverButtonMouse(`#${id}`, isHovered);

  return (
    <button
      style={style}
      id={id}
      onClick={() => {
        onClick && onClick();
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
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
