"use client";

import { useContext, useEffect, useRef, useState } from "react";

import ChangeLanguage from "@/app/[lng]/components/layout/navbar/change-language";
import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
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
  const reference = useRef(null);
  const lng = useContext(LngContext);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @ts-ignore
      if (reference.current && !reference.current.contains(event.target)) {
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
          ref={reference}
          onMouseEnter={() => setIsOpen(true)}
          id={"languages"}
        >
          {languages.map((language) =>
            language.redirect === lng ? null : (
              <ChangeLanguage key={language.redirect} language={language} />
            ),
          )}
        </div>
      ) : null}
    </div>
  );
};

export default LangageDropdown;
