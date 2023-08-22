"use client";

import {
  useEffect,
  useState,
  HTMLAttributes,
  ReactNode,
  CSSProperties,
} from "react";
import gsap from "gsap";

type Props = {
  text: string;
  id: string;
  icon?: ReactNode;
  className: HTMLAttributes<HTMLButtonElement>["className"];
  onClick?: () => void;
  style?: React.CSSProperties;
  direction: string;
};
const AnimatedButton = ({
  text,
  id,
  icon,
  className,
  onClick,
  style,
  direction,
}: Props) => {
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
