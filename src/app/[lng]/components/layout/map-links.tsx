import Link from "next/link";

import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { translate } from "@/app/i18n";

const links = [
  {
    href: "",
    translation: "home",
  },
  {
    href: "about-me",
    translation: "about-me",
  },
  {
    href: "my-story",
    translation: "my-story",
  },
];

const MapLinks = async ({ lng }: { lng: string }) => {
  const { t } = await translate(lng);

  return (
    <>
      {links.map((link) => (
        <Link
          data-side-text
          className={styles[link.translation]}
          key={link.translation}
          href={`/${lng}/${link.href}`}
        >
          {t(`navbar.links.${link.translation}`)}
        </Link>
      ))}
    </>
  );
};

export default MapLinks;
