"use client";

import React, { Dispatch, SetStateAction } from "react";

import { Language } from "@/app/admin/components/see-posts/see-posts";
import styles from "@/app/admin/components/see-posts/see-posts.module.css";

interface SeePostsHeadingProperties {
  setLangTitle: Dispatch<SetStateAction<Language>>;
  setLangContent: Dispatch<SetStateAction<Language>>;
  langTitle: string;
  langContent: string;
}

const SeePostsHeading = ({
  setLangTitle,
  setLangContent,
  langTitle,
  langContent,
}: SeePostsHeadingProperties) => (
  <thead>
    <tr className={styles.tr}>
      <th>Ordre</th>
      <th>
        <select
          className={styles.select}
          value={langTitle}
          onChange={(event) => setLangTitle(event.target.value as Language)}
        >
          <option value="fr">Titre Français</option>
          <option value="en">Titre Anglais</option>
          <option value="ja">Titre Japonais</option>
        </select>
      </th>
      <th>
        <select
          className={styles.select}
          value={langContent}
          onChange={(event) => setLangContent(event.target.value as Language)}
        >
          <option value="fr">Contenu Français</option>
          <option value="en">Contenu Anglais</option>
          <option value="ja">Contenu Japonais</option>
        </select>
      </th>
      <th>Image Principale</th>
      <th>Couleur</th>
      <th>Type</th>
      <th>Année</th>
      <th>Images</th>
      <th></th>
    </tr>
  </thead>
);

export default SeePostsHeading;
