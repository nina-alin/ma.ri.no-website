"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

const ProtectedRouteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    router.push("/api/auth/signin");
  }

  return children;
};

export default ProtectedRouteProvider;
