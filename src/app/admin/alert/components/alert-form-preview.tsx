import { useState } from "react";

import { AlertWithoutId } from "@/app/admin/alert/components/alert-form";
import styles from "@/app/admin/alert/components/alert-form.module.css";

const AlertFormPreview = ({ form }: { form: AlertWithoutId }) => {
  const [previewLang, setPreviewLang] = useState<string>("en");

  return (
    <>
      <div className={styles.preview_container}>
        <h2>Prévisualisation</h2>
        <select
          className={styles.select}
          onChange={(event) => setPreviewLang(event.target.value)}
        >
          <option value={"en"}>Anglais</option>
          <option value={"fr"}>Français</option>
          <option value={"jp"}>Japonais</option>
        </select>
      </div>
      <div className={styles.preview}>
        <h3>
          {previewLang === "en"
            ? form.titleEn
            : (previewLang === "fr"
            ? form.titleFr
            : form.titleJp)}
        </h3>
        <p>
          {previewLang === "en"
            ? form.contentEn
            : (previewLang === "fr"
            ? form.contentFr
            : form.contentJp)}
        </p>
      </div>
    </>
  );
};

export default AlertFormPreview;
