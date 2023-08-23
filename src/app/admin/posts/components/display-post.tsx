import { Types } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
// not typed so Typescript throws an error
// TODO: add a d.ts file for this package
// @ts-ignore
import { SketchPicker } from "react-color";

import styles from "@/app/admin/posts/components/add-post-form.module.css";
import { PostWithoutOrderAndWithoutId } from "@/types/posts";

interface DisplayPostProperties {
  setForm: Dispatch<SetStateAction<PostWithoutOrderAndWithoutId>>;
  form: PostWithoutOrderAndWithoutId;
  updateForm: (event: any, key: string) => void;
  types: Types[];
}

const DisplayPost = ({
  setForm,
  form,
  updateForm,
  types,
}: DisplayPostProperties) => {
  const handleTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: Types,
  ) => {
    form.type.map((t) => t.id).includes(type.id)
      ? setForm({
          ...form,
          type: form.type.filter((t) => t.id !== type.id),
        })
      : setForm({
          ...form,
          type: [...form.type, JSON.parse(event.target.value)],
        });
  };

  return (
    <div className={styles.section}>
      <h2>Affichage</h2>
      <div className={styles.sectionInput}>
        <div className={styles.label}>
          <span>Couleur d&apos;affichage</span>
          <SketchPicker
            type={"text"}
            placeholder={"Display Color"}
            onChange={(event: { hex: string }) =>
              setForm({
                ...form,
                displayColor: event.hex,
              })
            }
            color={form.displayColor}
          />
        </div>
        <div className={styles.sectionInput}>
          <div className={styles.label}>
            <label htmlFor="type">Type de projet</label>
            {types.map((type) => (
              <div key={type.id} className={styles.checkbox_container}>
                <input
                  className={styles.checkbox}
                  placeholder={"Type"}
                  name={type.nameFr}
                  value={JSON.stringify(type)}
                  checked={form.type.map((t) => t.id).includes(type.id)}
                  onChange={(event) => handleTypeChange(event, type)}
                  type={"checkbox"}
                />
                <label htmlFor={type.nameFr}>{type.nameFr}</label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.sectionInput}>
          <div className={styles.label}>
            <label htmlFor="date">Année du projet</label>
            <input
              name={"date"}
              className={styles.textfield}
              value={form.year}
              type="text"
              required
              onChange={(event) => updateForm(event, "year")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPost;
