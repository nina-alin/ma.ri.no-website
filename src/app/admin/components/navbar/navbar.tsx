"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import styles from "./navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <h1>Page d&apos;administration</h1>
      <div className={styles.addButtons}>
        {pathname === "/admin/posts/add" ? (
          <button onClick={() => router.push("/admin")} className={styles.add}>
            Retour aux projets
          </button>
        ) : (
          <button
            onClick={() => router.push("/admin/posts/add")}
            className={styles.add}
          >
            Ajouter un projet
          </button>
        )}
        {pathname === "/admin/alert" ? (
          <button onClick={() => router.push("/admin")} className={styles.add}>
            Retour aux projets
          </button>
        ) : (
          <button
            onClick={() => router.push("/admin/alert")}
            className={styles.add}
          >
            Ajouter une bannière
          </button>
        )}
      </div>
      <div className={styles.addButtons}>
        <button onClick={() => router.push("/")} className={styles.add}>
          Retour au site
        </button>
        <button onClick={() => signOut()} className={styles.add}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
