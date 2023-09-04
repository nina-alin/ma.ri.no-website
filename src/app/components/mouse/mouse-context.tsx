"use client";

import { gsap } from "gsap";
import React, { createContext, useRef, useState } from "react";

export const MouseContext = createContext<{
  ball: React.MutableRefObject<null>;
  // eslint-disable-next-line no-unused-vars
  handleMouseEnter: (event: MouseEvent) => void;
  // eslint-disable-next-line no-unused-vars
  handleMouseLeave: (event: MouseEvent) => void;
  handleMouseButton: () => void;
  handleMouseImage: (event: MouseEvent) => void;
  imageURL: string | undefined;
  setImageURL: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
  ball: null,
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  handleMouseButton: () => {},
  handleMouseImage: () => {},
  imageURL: undefined,
  setImageURL: () => {},
});

const MouseProvider = ({ children }: { children: React.ReactNode }) => {
  const ball = useRef(null);

  const [imageURL, setImageURL] = useState<string | undefined>();
  const handleMouseEnter = (event: MouseEvent) => {
    gsap.to(ball.current, {
      duration: 0.3,
      borderWidth: "2px",
      scale: 1,
      border: "2px solid #fff",
      borderRadius: "0",
      backgroundColor: "transparent",
      width: `${event.target.clientWidth + 20}px`,
      height: `${event.target.clientHeight + 20}px`,
      // the position of ball.current must be the center of the target element. margin is used to center the ball.current
      margin: `-${event.target.clientHeight / 2}px 0 0 -${
        event.target.clientWidth / 2
      }px`,
    });
  };

  const handleMouseLeave = (event: MouseEvent) => {
    gsap.to(ball.current, {
      duration: 0.3,
      scale: 0.5,
      border: "none",
      backgroundColor: "#fff",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      margin: "0",
      x: event?.pageX - 15,
      y:
        event?.pageY - 15 - window.scrollY ||
        document.documentElement.scrollTop,
    });
  };

  const handleMouseButton = (event) => {
    gsap.to(ball.current, {
      duration: 0.3,
      scale: 1,
      borderRadius: "0",
      backgroundColor: "transparent",
      width: `${event.target.clientWidth}px`,
      height: `${event.target.clientHeight}px`,
      // the position of ball.current must be the center of the target element. margin is used to center the ball.current
      margin: `-${event.target.clientHeight / 2}px 0 0 -${
        event.target.clientWidth / 2
      }px`,
    });
  };

  const handleMouseImage = (event) => {
    gsap.to(ball.current, {
      duration: 0.3,
      backgroundColor: "transparent",
      margin: `-${(event.target.clientHeight - 50) / 2}px 0 0 -${
        (event.target.clientWidth + -300) / 2
      }px`,
    });
  };

  return (
    <MouseContext.Provider
      value={{
        ball,
        handleMouseEnter,
        handleMouseLeave,
        handleMouseButton,
        handleMouseImage,
        imageURL,
        setImageURL,
      }}
    >
      {children}
    </MouseContext.Provider>
  );
};

export default MouseProvider;
