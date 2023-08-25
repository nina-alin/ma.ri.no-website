"use client";

import { Types } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import { useChosenTypeContext } from "@/app/[lng]/components/chosen-type/chosen-type-context";
import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";

const MapProjects = ({
  projectsAlreadyFetched,
}: {
  projectsAlreadyFetched?: Types[];
}) => {
  const router = useRouter();

  const lng = useContext(LngContext);
  const { chosenType, setChosenType } = useChosenTypeContext();

  const [projects, setProjects] = useState<Types[]>([]);

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
          onClick={() => {
            setChosenType(project.id);
            router.push(`${lng}#projects`);
          }}
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
