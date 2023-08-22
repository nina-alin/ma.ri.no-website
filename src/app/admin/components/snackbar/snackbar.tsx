"use client";

import React, { useEffect } from "react";

import styles from "./snackbar.module.css";

interface SnackBarProperties {
  message: string;
  dismiss: () => void;
  color: string;
}

const Snackbar = ({ message, dismiss, color }: SnackBarProperties) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      dismiss();
    }, 2500);
    return () => clearTimeout(timer);
  }, [dismiss]);

  return (
    <div className={styles.snackbarContainer} style={{ background: color }}>
      <div className={styles.snackbarLabel}>{message}</div>
      <div className={styles.snackbarDismiss} onClick={dismiss}>
        X
      </div>
    </div>
  );
};

export default Snackbar;
