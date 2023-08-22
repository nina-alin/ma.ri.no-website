import MapLinks from "@/app/[lng]/components/layout/map-links";
import NavbarClient from "@/app/[lng]/components/layout/navbar/navbar-client";
import NavbarLinks from "@/app/[lng]/components/layout/navbar/navbar-links";
import NavbarProjects from "@/app/[lng]/components/layout/navbar/navbar-projects";
import RightSideOfNavbar from "@/app/[lng]/components/layout/navbar/right-side-of-navbar";
import { translate } from "@/app/i18n";

import styles from "./navbar.module.css";

interface NavbarProperties {
  lng: string;
}

const Navbar = async ({ lng }: NavbarProperties) => {
  const { t } = await translate(lng);

  return (
    <NavbarClient
      navbarLinks={<NavbarLinks lng={lng} />}
      langageDropdown={<RightSideOfNavbar lng={lng} />}
    >
      <div
        className={styles.links}
        data-scroll
        data-scroll-speed="3"
        data-scroll-position="top"
      >
        <MapLinks lng={lng} />
        <NavbarProjects projectTranslation={t(`navbar.links.projects`)} />
      </div>
    </NavbarClient>
  );
};

export default Navbar;
