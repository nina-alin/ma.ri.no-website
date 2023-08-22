"use client";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import ChangeLanguage from "@/app/[lng]/components/layout/navbar/change-language";
import { useContext, useEffect, useRef, useState } from "react";
import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";

const languages = [
  {
    display: "EN",
    redirect: "en",
  },
  {
    display: "FR",
    redirect: "fr",
  },
  {
    display: "JP",
    redirect: "ja",
  },
];
const LangageDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  let ref = useRef(null);
  const lng = useContext(LngContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id={"language-dropdown"}>
      <button
        style={isOpen ? { color: "#ddadb4" } : {}}
        className={styles.language}
        onMouseEnter={() => setIsOpen(true)}
      >
        {lng.toUpperCase()}
      </button>
      {isOpen ? (
        <div
          className={styles.languages}
          ref={ref}
          onMouseEnter={() => setIsOpen(true)}
          id={"languages"}
        >
          {languages.map((language) =>
            language.redirect !== lng ? (
              <ChangeLanguage key={language.redirect} language={language} />
            ) : null,
          )}
        </div>
      ) : null}
    </div>
  );
};

export default LangageDropdown;
