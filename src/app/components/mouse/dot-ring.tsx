"use client";

import { gsap } from "gsap";
import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { MouseContext } from "@/app/components/mouse/mouse-context";

import styles from "./dot-ring.module.css";

const DotRing = () => {
  const { ball, imageURL } = useContext(MouseContext);

  const [previousX, setPreviousX] = useState<number>(0);
  const [previousY, setPreviousY] = useState<number>(0);
  const [previousTimeStamp, setPreviousTimeStamp] = useState<number>(0);

  useEffect(() => {
    addEventListeners();
    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener("mousemove", handleMouseEvent);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", handleMouseEvent);
  };

  const handleMouseEvent = (event: MouseEvent) => {
    gsap.to(ball.current, {
      duration: 0.5,
      x: event.pageX - 15,
      y:
        event.pageY - 15 - window.scrollY || document.documentElement.scrollTop,
    });
  };

  return (
    <div className={styles.magicCursor}>
      <div className={styles.ball} ref={ball} id={"ball"}>
        {imageURL ? (
          <LazyLoadImage
            className={styles.image}
            src={imageURL}
            alt={"cursor"}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DotRing;
