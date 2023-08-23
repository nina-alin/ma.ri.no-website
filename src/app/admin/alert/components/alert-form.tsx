"use client";

import { Alert } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { createPortal } from "react-dom";

import Snackbar from "@/app/admin/components/snackbar/snackbar";

import styles from "./alert-form.module.css";

const AlertForm = ({ alert }: { alert: Alert }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    titleEn: alert.titleEn,
    titleFr: alert.titleFr,
    titleJp: alert.titleJp,
    contentEn: alert.contentEn,
    contentFr: alert.contentFr,
    contentJp: alert.contentJp,
    status: alert.status,
  });
  const [previewLang, setPreviewLang] = useState("en");
  const [showSnackbar, setShowSnackbar] = useState({
    toggle: false,
    msg: "",
    color: "",
  });

  const onSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) => {
    event.preventDefault();

    const response = await fetch("/api/alerts", {
      method: "PUT",
      body: JSON.stringify(form),
    });

    console.log(response);

    if (response.status === 200) {
      router.push("/admin");
      setShowSnackbar({
        toggle: true,
        msg: "Bannière modifiée avec succès",
        color: "#4caf50",
      });
    } else {
      setShowSnackbar({
        toggle: true,
        msg: "Erreur lors de la modification de la bannière",
        color: "#f44336",
      });
    }
  };

  const updateForm = (event: any, key: string) => {
    setForm({
      ...form,
      [key]: event.target.value,
    });
  };

  const updateStatus = (event: any) => {
    setForm({
      ...form,
      status: event.target.checked ? "enabled" : "disabled",
    });
  };

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.section}>
          <div className={styles.sectionInput}>
            <h2 className={styles.heading}>Titres</h2>
            <div className={styles.checkbox_container}>
              <label htmlFor="status">Afficher ?</label>
              <input
                name={"status"}
                checked={form.status === "enabled"}
                type="checkbox"
                onChange={(event) => updateStatus(event)}
              />
            </div>
            <button className={styles.submit} type={"submit"}>
              Envoyer
            </button>
          </div>
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
        </div>
      </form>
      {showSnackbar.toggle &&
        createPortal(
          <Snackbar
            dismiss={() =>
              setShowSnackbar({ toggle: false, msg: "", color: "" })
            }
            message={showSnackbar.msg}
            color={showSnackbar.color}
          />,
          document.body,
        )}
    </main>
  );
};

export default AlertForm;
