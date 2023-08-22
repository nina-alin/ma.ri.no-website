"use client";

import { Types } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { prisma } from "@/lib/prisma";
const MapProjects = ({ lng }: { lng: string }) => {
  const [projects, setProjects] = useState<Types[]>([]);

  useEffect(() => {
    (async () => {
      setProjects(
        await fetch("/api/types", {
          method: "GET",
        }).then((response) => response.json()),
      );
    })();
  }, []);

  return (
    <>
      {projects.map((project: Types) => (
        <Link
          className={styles.project}
          key={project.id}
          href={`${lng}#projects?type=${project.nameEn}`}
        >
          {lng === "fr"
            ? project.nameFr
            : (lng === "en"
            ? project.nameEn
            : project.nameJp)}
        </Link>
      ))}
    </>
  );
};

export default MapProjects;