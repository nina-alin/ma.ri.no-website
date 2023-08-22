"use client";

import { ChangeEvent, MouseEventHandler, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./add-post-form.module.css";
import { createPortal } from "react-dom";
import Snackbar from "@/app/admin/components/snackbar/snackbar";
import { Types } from "@prisma/client";
import ImageUpload from "@/app/admin/components/add-post/image-upload";
import { PostWithoutOrderAndWithoutId, PostWithType } from "@/types/posts";
import TitlesPost from "@/app/admin/components/add-post/titles-post";
import DescriptionsPost from "@/app/admin/components/add-post/descriptions-post";
import DisplayPost from "@/app/admin/components/add-post/display-post";

interface Props {
  post?: PostWithType;
  types: Types[];
}

const AddPostForm = ({ post, types }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const [showSnackbar, setShowSnackbar] = useState({
    toggle: false,
    msg: "",
    color: "",
  });

  const isAddPage = pathname === "/admin/posts/add";

  const [form, setForm] = useState<PostWithoutOrderAndWithoutId>({
    titleFr: post?.titleFr ?? "",
    titleEn: post?.titleEn ?? "",
    titleJp: post?.titleJp ?? "",
    contentFr: post?.contentFr ?? "",
    contentEn: post?.contentEn ?? "",
    contentJp: post?.contentJp ?? "",
    mainImageUrl: post?.mainImageUrl ?? "",
    imagesUrl: post?.imagesUrl ?? [],
    displayColor: post?.displayColor ?? "",
    type: post?.type ?? [],
    year: post?.year ?? "",
  });

  const updateForm = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    setForm({
      ...form,
      [key]: event.target.value,
    });
  };

  const handleSubmit = async (event: MouseEventHandler<HTMLButtonElement>) => {
    // @ts-ignore
    event.preventDefault();

    if (isAddPage) {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (res.status === 200) {
        router.push("/admin");
        setShowSnackbar({
          toggle: true,
          msg: "Projet ajouté avec succès",
          color: "#4caf50",
        });
      } else {
        setShowSnackbar({
          toggle: true,
          msg: "Erreur lors de l'ajout du projet",
          color: "#f44336",
        });
      }
    } else {
      const res = await fetch(`/api/posts`, {
        method: "PUT",
        body: JSON.stringify({ id: post?.id, ...form }),
      });

      if (res.status === 200) {
        router.push("/admin");
        setShowSnackbar({
          toggle: true,
          msg: "Projet modifié avec succès",
          color: "#4caf50",
        });
      } else {
        setShowSnackbar({
          toggle: true,
          msg: "Erreur lors de la modification du projet",
          color: "#f44336",
        });
      }
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <div className={styles.heading}>
          <h1>{isAddPage ? "Ajouter un projet" : `Editer ${post?.titleFr}`}</h1>
          <button
            className={styles.submit}
            type={"submit"}
            // @ts-ignore
            onClick={handleSubmit}
          >
            Envoyer
          </button>
        </div>
        <TitlesPost form={form} updateForm={updateForm} />
        <DescriptionsPost form={form} updateForm={updateForm} />
        <ImageUpload setForm={setForm} form={form} />
        <DisplayPost
          updateForm={updateForm}
          types={types}
          form={form}
          setForm={setForm}
        />
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

export default AddPostForm;
