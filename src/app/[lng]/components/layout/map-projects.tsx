"use client";

import { Types } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import { SmoothScrollContext } from "@/app/components/locomotive-scroll/locomotive-scroll-app-provider";
import { TransitionContext } from "@/app/components/transition-handler/transition-provider";

const MapProjects = ({
  projectsAlreadyFetched,
  openMenu,
}: {
  projectsAlreadyFetched?: Types[];
  openMenu?: () => void;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const lng = useContext(LngContext);
  const { setUrl } = useContext(TransitionContext);
  const { scroll } = useContext(SmoothScrollContext);

  const [projects, setProjects] = useState<Types[]>([]);

  const handleClick = (projectId: string) => {
    if (pathname === `/${lng}` && scroll) {
      router.push(`${pathname}?projects=${projectId}`);
      scroll.scrollTo(document.querySelector("#projects") as HTMLElement);
      openMenu && openMenu();
    } else {
      setUrl(`/${lng}?projects=${projectId}`);
    }
  };

  useEffect(() => {
    if (projectsAlreadyFetched) {
      setProjects(projectsAlreadyFetched);
    } else {
      (async () => {
        const response = await fetch("/api/types", {
          method: "GET",
        });
        setProjects(await response.json());
      })();
    }
  }, [projectsAlreadyFetched]);

  return (
    <>
      {projects.map((project: Types) => (
        <span
          data-side-text
          onClick={() => handleClick(project.id)}
          key={project.id}
          className={styles.project}
        >
          {lng === "fr"
            ? project.nameFr
            : (lng === "en"
            ? project.nameEn
            : project.nameJp)}
        </span>
      ))}
    </>
  );
};

export default MapProjects;
