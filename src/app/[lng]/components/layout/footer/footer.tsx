import Link from "next/link";

import MapLinks from "@/app/[lng]/components/layout/map-links";
import MapProjects from "@/app/[lng]/components/layout/map-projects";
import Logo from "@/app/[lng]/components/svg/logo";
import Instagram from "@/app/components/svg/instagram";
import { translate } from "@/app/i18n";

import styles from "./footer.module.css";

const Footer = async ({ lng }: { lng: string }) => {
  const { t } = await translate(lng);

  return (
    <footer className={styles.footer} data-scroll-section>
      <div className={styles.section}>
        <div className={styles.description}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <p>{t("footer.description")}</p>
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.links}>
            <h4>{t("footer.menu")}</h4>
            <ul>
              <MapLinks lng={lng} />
              <Link href={"/projects"}>
                {t("footer.projects").toLowerCase()}
              </Link>
            </ul>
          </div>
          <div className={styles.links}>
            <h4>{t("footer.projects")}</h4>
            <ul>
              <MapProjects lng={lng} />
            </ul>
          </div>
          <div className={styles.links}>
            <h4>{t("footer.contact")}</h4>
            <ul>
              <li>
                <a href={"tel:+000"}>+0000000</a>
              </li>
              <li>
                <a href={"mailto:debmail@gmail;com"}>debmail@gmail;com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.sectionBottom}>
        <div className={styles.credits}>
          <p>© 2023 ma.ri.no</p>
          <p>
            {t("footer.designedBy")}
            <Link
              style={{ textDecoration: "underline" }}
              href={"https://github.com/nina-alin"}
            >
              Nina Alin
            </Link>
          </p>
          <p>
            {t("footer.developedBy")}{" "}
            <Link
              style={{ textDecoration: "underline" }}
              href={"https://github.com/nina-alin"}
            >
              Nina Alin
            </Link>
          </p>
        </div>
        <Link href={"https://www.instagram.com/ma.ri.no_studio/"}>
          <div className={styles.socials}>
            <Instagram />
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
