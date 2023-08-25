import Link from "next/link";

import MapLinks from "@/app/[lng]/components/layout/map-links";
import MapProjects from "@/app/[lng]/components/layout/map-projects";
import styles from "@/app/[lng]/components/layout/navbar/navbar.module.css";
import { translate } from "@/app/i18n";

const NavbarLinks = async ({ lng }: { lng: string }) => {
  const { t } = await translate(lng);

  return (
    <div className={styles.sidnavLinks}>
      <MapLinks lng={lng} />
      <Link key={"projects"} href={`${lng}/projects`} data-side-text>
        {t(`navbar.links.projects`)}
      </Link>
      <hr className={styles.hr} />
      <MapProjects lng={lng} />
    </div>
  );
};
export default NavbarLinks;
