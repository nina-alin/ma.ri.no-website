"use client";

import React from "react";

import styles from "@/app/admin/posts/components/add-post-form.module.css";

interface DescriptionsPostProperties {
  form: {
    contentEn: string;
    contentFr: string;
    contentJp: string;
  };
  // eslint-disable-next-line no-unused-vars
  updateForm: (event: any, key: string) => void;
}

const DescriptionsPost = ({ updateForm, form }: DescriptionsPostProperties) => {
  return (
    <div className={styles.section}>
      <h2>Contenu</h2>
      <div className={styles.sectionInput}>
        <div className={styles.label}>
          <label htmlFor="contentEn">Description anglaise</label>
          <textarea
            name={"contentEn"}
            className={styles.textarea}
            required
            rows={10}
            cols={50}
            value={form.contentEn}
            onChange={(event) => updateForm(event, "contentEn")}
          />
        </div>
        <div className={styles.label}>
          <label htmlFor="contentFr">Description française</label>
          <textarea
            name={"contentFr"}
            className={styles.textarea}
            rows={10}
            cols={50}
            required
            value={form.contentFr}
            onChange={(event) => updateForm(event, "contentFr")}
          />
        </div>
        <div className={styles.label}>
          <label htmlFor="contentJp">Description japonaise</label>
          <textarea
            name={"contentJp"}
            className={styles.textarea}
            rows={10}
            cols={50}
            required
            value={form.contentJp}
            onChange={(event) => updateForm(event, "contentJp")}
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionsPost;
