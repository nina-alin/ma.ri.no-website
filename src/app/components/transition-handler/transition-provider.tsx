"use client";

import { usePathname } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const TransitionContext = createContext<{
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
}>({
  url: "",
  setUrl: () => {},
});

const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [url, setUrl] = useState<string>(pathname);

  return (
    <TransitionContext.Provider value={{ url, setUrl }}>
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionProvider;
