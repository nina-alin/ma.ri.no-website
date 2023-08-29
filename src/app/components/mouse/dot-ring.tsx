"use client";

import React from "react";

import useMousePosition from "@/app/components/mouse/use-mouse-position";

import styles from "./dot-ring.module.css";

const DotRing = () => {
  const { x, y } = useMousePosition();

  return (
    <>
      <div className={styles.dot} style={{ left: `${x}px`, top: `${y}px` }} />
    </>
  );
};

export default DotRing;
