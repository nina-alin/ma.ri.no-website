"use client";

import { Alert } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { createPortal } from "react-dom";

import AlertFormPreview from "@/app/admin/alert/components/alert-form-preview";
import AlertFormTextareas from "@/app/admin/alert/components/alert-form-textareas";
import AlertFormTitles from "@/app/admin/alert/components/alert-form-titles";
import Snackbar from "@/app/admin/components/snackbar/snackbar";

import styles from "./alert-form.module.css";

export type AlertWithoutId = Omit<Alert, "id">;
const AlertForm = ({ alert }: { alert: Alert }) => {
  const router = useRouter();

  const [form, setForm] = useState<AlertWithoutId>({
    titleEn: alert.titleEn,
    titleFr: alert.titleFr,
    titleJp: alert.titleJp,
    contentEn: alert.contentEn,
    contentFr: alert.contentFr,
    contentJp: alert.contentJp,
    status: alert.status,
  });
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
          <AlertFormTitles form={form} updateForm={updateForm} />
          <AlertFormTextareas form={form} updateForm={updateForm} />
          <AlertFormPreview form={form} />
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
