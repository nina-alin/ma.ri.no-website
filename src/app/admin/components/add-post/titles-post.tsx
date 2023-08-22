"use client";

import styles from "@/app/admin/components/add-post/add-post-form.module.css";

interface TitlesPostProperties {
  form: {
    titleEn: string;
    titleFr: string;
    titleJp: string;
  };
  updateForm: (event: any, key: string) => void;
}
const TitlesPost = ({ form, updateForm }: TitlesPostProperties) => {
  return (
    <div className={styles.section}>
      <h2>Titres</h2>
      <div className={styles.sectionInput}>
        <div className={styles.label}>
          <label htmlFor="titleEn">Titre anglais</label>
          <input
            name={"titleEn"}
            className={styles.textfield}
            value={form.titleEn}
            type="text"
            required
            onChange={(event) => updateForm(event, "titleEn")}
          />
        </div>
        <div className={styles.label}>
          <label htmlFor="titleFr">Titre français</label>
          <input
            name={"titleFr"}
            className={styles.textfield}
            required
            value={form.titleFr}
            type="text"
            onChange={(event) => updateForm(event, "titleFr")}
          />
        </div>
        <div className={styles.label}>
          <label htmlFor="titleJp">Titre japonais</label>
          <input
            name={"titleJp"}
            className={styles.textfield}
            value={form.titleJp}
            type="text"
            required
            onChange={(event) => updateForm(event, "titleJp")}
          />
        </div>
      </div>
    </div>
  );
};

export default TitlesPost;
