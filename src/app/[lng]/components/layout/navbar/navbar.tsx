import MapLinks from "@/app/[lng]/components/layout/map-links";
import NavbarClient from "@/app/[lng]/components/layout/navbar/navbar-client";
import NavbarLinks from "@/app/[lng]/components/layout/navbar/navbar-links";
import NavbarProjects from "@/app/[lng]/components/layout/navbar/navbar-projects";
import RightSideOfNavbar from "@/app/[lng]/components/layout/navbar/right-side-of-navbar";

import styles from "./navbar.module.css";

interface NavbarProperties {
  lng: string;
}

const Navbar = async ({ lng }: NavbarProperties) => (
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
      <MapLinks />
      <NavbarProjects />
    </div>
  </NavbarClient>
);

export default Navbar;
