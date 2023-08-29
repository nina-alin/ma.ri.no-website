import React from "react";

import { AlertWithoutId } from "@/app/admin/alert/components/alert-form";
import styles from "@/app/admin/alert/components/alert-form.module.css";

interface AlertFormTitlesProperties {
  form: AlertWithoutId;
  // eslint-disable-next-line no-unused-vars
  updateForm: (event: any, key: string) => void;
}

const AlertFormTitles = ({ form, updateForm }: AlertFormTitlesProperties) => (
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
);

export default AlertFormTitles;
