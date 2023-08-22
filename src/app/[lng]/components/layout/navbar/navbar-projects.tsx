"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import Link from "next/link";
import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import MapProjects from "@/app/[lng]/components/layout/map-projects";

const NavbarProjects = ({
  projectTranslation,
}: {
  projectTranslation: string;
}) => {
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
    <div className={"projects-dropdown"} onMouseEnter={() => setIsOpen(true)}>
      <Link
        className={styles.projects}
        key={"projects"}
        href={`#projects`}
        data-scroll-to
      >
        {projectTranslation}
      </Link>
      {isOpen ? (
        <div
          ref={ref}
          className={styles.subprojects}
          onMouseEnter={() => setIsOpen(true)}
        >
          <MapProjects lng={lng} />
        </div>
      ) : null}
    </div>
  );
};

export default NavbarProjects;
