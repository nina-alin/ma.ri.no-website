"use client";

import { SessionProvider } from "next-auth/react";

type Properties = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Properties) => {
  return <SessionProvider>{children}</SessionProvider>;
};
