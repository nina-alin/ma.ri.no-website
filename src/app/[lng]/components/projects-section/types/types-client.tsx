"use client";

import { Types } from "@prisma/client";
import { useContext, useEffect, useState } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import ImageFromGallery from "@/app/[lng]/components/projects-section/project-modal/image-from-gallery";
import styles from "@/app/[lng]/page.module.css";
import { PostWithType } from "@/types/posts";

interface TypesClientProperties {
  types: Types[];
  translations: {
    all: string;
    projectGallery: string;
  };
}

const TypesClient = ({ types, translations }: TypesClientProperties) => {
  const [chosenType, setChosenType] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostWithType[]>([]);
  const [numberOfPosts, setNumberOfPosts] = useState<number>(6);
  const [maxNumberOfPosts, setMaxNumberOfPosts] = useState<number>(0);
  const lng = useContext(LngContext);
  const typeLang = (type: Types) =>
    lng === "en" ? type.nameEn : (lng === "fr" ? type.nameFr : type.nameJp);

  useEffect(() => {
    (async () => {
      setMaxNumberOfPosts(
        await fetch(`/api/posts/count`).then((response) => response.json()),
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setPosts(
        await fetch(`/api/posts?take=${numberOfPosts}`).then((response) =>
          response.json(),
        ),
      );
    })();
  }, [numberOfPosts]);

  useEffect(() => {
    if (chosenType) {
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
          {translations.projectGallery}
        </h2>
        <div className={styles.projectsBannerLinks}>
          <span
            className={styles.underlineAnimation}
            style={{
              textDecoration: chosenType === null ? "underline" : "none",
            }}
            onClick={async () => {
              setChosenType(null);
              setNumberOfPosts(6);
              setPosts(
                await fetch(`/api/posts`).then((response) => response.json()),
              );
            }}
          >
            {translations.all.toLowerCase()}
          </span>
          {types.map((type) => (
            <span
              onClick={() => {
                setNumberOfPosts(6);
                setChosenType(type.id);
              }}
              key={type.id}
              className={styles.underlineAnimation}
              style={{
                textDecoration: chosenType === type.id ? "underline" : "none",
              }}
            >
              {typeLang(type).toLowerCase()}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.projectsGallery}>
        {posts?.map((post) => (
          <ImageFromGallery
            key={post.id}
            post={post}
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
          Load more ...
        </button>
      ) : null}
    </div>
  );
};

export default TypesClient;
