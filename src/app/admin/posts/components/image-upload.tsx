"use client";

import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { PostWithoutOrderAndWithoutId } from "@/types/posts";

import styles from "./add-post-form.module.css";

const parseImageUrl = (url: string) => {
  const urlSplit = url.split("/");
  const id = urlSplit[5].split("?")[0];
  return `https://drive.google.com/uc?id=${id}`;
};

interface Properties {
  form: PostWithoutOrderAndWithoutId;
  setForm: Dispatch<SetStateAction<PostWithoutOrderAndWithoutId>>;
}

const ImageUpload = ({ setForm, form }: Properties) => {
  const [fileNumber, setFileNumber] = useState(form.imagesUrl.length ?? 0);

  const updateStateAtIndex = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (index < form.imagesUrl.length) {
      const newImagesUrl = [...form.imagesUrl];
      newImagesUrl[index] = parseImageUrl(event.target.value);
      setForm({
        ...form,
        imagesUrl: newImagesUrl,
      });
    } else {
      setForm({
        ...form,
        imagesUrl: [...form.imagesUrl, parseImageUrl(event.target.value)],
      });
    }
  };

  // @ts-ignore
  return (
    <>
      <div className={styles.section}>
        <h2>Images</h2>
        <div className={styles.imageContainer}>
          {form.mainImageUrl && (
            <LazyLoadImage
              className={styles.imageSize}
              src={form.mainImageUrl}
              alt={"secondary image"}
            />
          )}
          <input
            type={"text"}
            className={styles.textfield}
            onChange={(event) =>
              setForm({
                ...form,
                mainImageUrl: parseImageUrl(event.target.value),
              })
            }
            style={{ maxHeight: "3vh", width: "500px" }}
            value={form.mainImageUrl}
          />
        </div>
        <div className={styles.imagesUrl}>
          {/* @ts-ignore */}
          {[...Array.from({ length: fileNumber }).keys()].map((index) => (
            <div key={index} className={styles.imageContainer}>
              {form.imagesUrl[index] && (
                <LazyLoadImage
                  src={form.imagesUrl[index]}
                  alt={"secondary image"}
                  className={styles.imageSize}
                />
              )}
              <input
                style={{ maxHeight: "3vh", width: "500px" }}
                className={styles.textfield}
                type={"text"}
                onChange={(event) => updateStateAtIndex(event, index)}
                value={form.imagesUrl[index]}
              />
            </div>
          ))}
          <button
            className={styles.submit}
            style={{ width: "500px", fontSize: "0.8rem" }}
            type={"button"}
            onClick={() => setFileNumber(fileNumber + 1)}
          >
            Ajouter une image secondaire
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
