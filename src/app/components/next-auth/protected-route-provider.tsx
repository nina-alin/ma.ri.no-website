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

  switch (session.status) {
    case "unauthenticated": {
      router.push("/api/auth/signin");

      break;
    }
    case "loading": {
      return <div>Loading...</div>;
    }
    case "authenticated": {
      return children;
    }
    default: {
      return <div>Something went wrong</div>;
    }
  }
};

export default ProtectedRouteProvider;
