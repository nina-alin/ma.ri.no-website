import React from "react";

import { AlertWithoutId } from "@/app/admin/alert/components/alert-form";
import styles from "@/app/admin/alert/components/alert-form.module.css";

interface AlertFormTextareasProperties {
  form: AlertWithoutId;
  // eslint-disable-next-line no-unused-vars
  updateForm: (event: any, key: string) => void;
}

const AlertFormTextareas = ({
  form,
  updateForm,
}: AlertFormTextareasProperties) => (
  <>
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
  </>
);

export default AlertFormTextareas;
