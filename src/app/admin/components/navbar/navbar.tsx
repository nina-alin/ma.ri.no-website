"use client";

import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <h1>Page d&apos;administration</h1>
      <div className={styles.addButtons}>
        <button
          onClick={() => router.push("/admin/posts/add")}
          className={styles.add}
        >
          Ajouter un projet
        </button>
        <button
          onClick={() => router.push("/admin/banner")}
          className={styles.add}
        >
          Ajouter une bannière
        </button>
      </div>
      <button onClick={() => router.push("/")} className={styles.add}>
        Retour au site
      </button>
    </nav>
  );
};

export default Navbar;
