"use client";

import { Types } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import ImageFromGallery from "@/app/[lng]/components/projects-section/project-modal/image-from-gallery";
import TypesClientProjectsLinks from "@/app/[lng]/components/projects-section/types/types-client-projects-links";
import styles from "@/app/[lng]/page.module.css";
import useHoverButtonMouse from "@/app/components/gsap/hover-button-mouse";
import { MouseContext } from "@/app/components/mouse/mouse-context";
import { useTranslation } from "@/app/i18n/client";
import { PostWithType } from "@/types/posts";
import getSearchParameters from "@/utils/get-search-parameters";

interface TypesClientProperties {
  types: Types[];
}

const TypesClient = ({ types }: TypesClientProperties) => {
  const lng = useContext(LngContext);

  const { t } = useTranslation(lng);

  const [posts, setPosts] = useState<PostWithType[]>([]);
  const [numberOfPosts, setNumberOfPosts] = useState<number>(6);
  const [maxNumberOfPosts, setMaxNumberOfPosts] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const searchParameters = useSearchParams();
  const chosenType = getSearchParameters(searchParameters);

  useHoverButtonMouse(`#see-more-button`, isHovered);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/posts/count", {
        method: "GET",
      });
      setMaxNumberOfPosts(await response.json());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (chosenType === "all" || !chosenType) {
        const response = await fetch(`/api/posts?take=${numberOfPosts}`);
        setPosts(await response.json());
      }
    })();
  }, [chosenType, numberOfPosts]);

  useEffect(() => {
    if (chosenType !== "all" && chosenType) {
      (async () => {
        setPosts(
          await fetch(
            `/api/types/${chosenType}/posts?take=${numberOfPosts}`,
          ).then((response) => response.json()),
        );
        const maxPosts = await fetch(
          `/api/types/${chosenType}/posts/count`,
        ).then((response) => response.json());
        // numberOfPosts could be greater than maxPosts
        // because it is set to 6 when a type is chosen
        if (numberOfPosts > maxPosts) {
          setNumberOfPosts(maxPosts);
        }
        setMaxNumberOfPosts(maxPosts);
      })();
    }
  }, [chosenType, numberOfPosts]);

  return (
    <div className={styles.projects} id={"projects"}>
      <div className={styles.projectsBanner}>
        <h2
          className={styles.projectsTitle}
          data-scroll
          data-scroll-speed="1"
          data-scroll-delay="0.2"
        >
          {t("home.projects-gallery")}
        </h2>
        <TypesClientProjectsLinks
          setNumberOfPosts={setNumberOfPosts}
          setPosts={setPosts}
          types={types}
        />
      </div>
      <div className={styles.projectsGallery}>
        {posts?.map((post, index) => (
          <ImageFromGallery
            key={post.id}
            post={post}
            index={index}
            posts={posts}
            numberOfPosts={numberOfPosts}
          />
        ))}
      </div>
      {maxNumberOfPosts > numberOfPosts ? (
        <button
          id={"see-more-button"}
          style={{ alignSelf: "flex-end" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={styles.more}
          onClick={() => {
            setNumberOfPosts(numberOfPosts + 6);
            setIsHovered(false);
          }}
        >
          {t("home.see-more")}
        </button>
      ) : null}
    </div>
  );
};

export default TypesClient;
