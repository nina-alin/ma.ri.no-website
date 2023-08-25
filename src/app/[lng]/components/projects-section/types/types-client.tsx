"use client";

import { Types } from "@prisma/client";
import { useContext, useEffect, useState } from "react";

import { useChosenTypeContext } from "@/app/[lng]/components/chosen-type/chosen-type-context";
import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import ImageFromGallery from "@/app/[lng]/components/projects-section/project-modal/image-from-gallery";
import TypesClientProjectsLinks from "@/app/[lng]/components/projects-section/types/types-client-projects-links";
import styles from "@/app/[lng]/page.module.css";
import { useTranslation } from "@/app/i18n/client";
import { PostWithType } from "@/types/posts";

interface TypesClientProperties {
  types: Types[];
}

const TypesClient = ({ types }: TypesClientProperties) => {
  const { chosenType, setChosenType } = useChosenTypeContext();
  const lng = useContext(LngContext);

  const { t } = useTranslation(lng);

  const [posts, setPosts] = useState<PostWithType[]>([]);
  const [numberOfPosts, setNumberOfPosts] = useState<number>(6);
  const [maxNumberOfPosts, setMaxNumberOfPosts] = useState<number>(0);

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
      const response = await fetch(`/api/posts?take=${numberOfPosts}`);
      setPosts(await response.json());
    })();
  }, [numberOfPosts]);

  useEffect(() => {
    if (chosenType !== "all") {
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
          setChosenType={setChosenType}
          setNumberOfPosts={setNumberOfPosts}
          setPosts={setPosts}
          types={types}
          chosenType={chosenType}
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
          style={{ alignSelf: "flex-end" }}
          className={styles.more}
          onClick={() => setNumberOfPosts(numberOfPosts + 6)}
        >
          {t("home.see-more")}
        </button>
      ) : null}
    </div>
  );
};

export default TypesClient;
