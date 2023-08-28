"use client";

import { Types } from "@prisma/client";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import MapProjects from "@/app/[lng]/components/layout/map-projects";
import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import { useTranslation } from "@/app/i18n/client";

const NavbarProjects = () => {
  const lng = useContext(LngContext);
  const { t } = useTranslation(lng);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const reference = useRef(null);
  const [projectsDropdown, setProjectsDropdown] = useState<HTMLElement | null>(
    null,
  );
  const [projects, setProjects] = useState<Types[]>([]);

  useEffect(() => {
    setProjectsDropdown(document.querySelector("#subprojects") as HTMLElement);
  }, [isOpen]);

  useEffect(() => {
    const projectsLink = document.querySelector("#projectsNavbar");
    const projectsLinkPosition = projectsLink?.getBoundingClientRect();

    // place the dropdown under the projects link
    if (projectsDropdown && projectsLinkPosition) {
      projectsDropdown.style.position = "absolute";
      projectsDropdown.style.top = projectsLinkPosition.top + 50 + "px";
      projectsDropdown.style.left = projectsLinkPosition.left + "px";
    }
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
  }, [projectsDropdown]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/types", {
        method: "GET",
      });
      setProjects(await response.json());
    })();
  }, []);

  return (
    <div className={"projects-dropdown"} onMouseEnter={() => setIsOpen(true)}>
      <Link
        className={styles.projects}
        key={"projects"}
        href={`#projects`}
        data-scroll-to
        id={"projectsNavbar"}
      >
        {t(`navbar.links.projects`)}
      </Link>
      {isOpen &&
        // correct a bug where the dropdown would be hidden because of Locomotive Scroll
        createPortal(
          <div
            ref={reference}
            id={"subprojects"}
            className={styles.subprojects}
            onMouseLeave={() => setIsOpen(false)}
            onMouseEnter={() => setIsOpen(true)}
          >
            <MapProjects projectsAlreadyFetched={projects} />
          </div>,
          document.body,
        )}
    </div>
  );
};

export default NavbarProjects;
