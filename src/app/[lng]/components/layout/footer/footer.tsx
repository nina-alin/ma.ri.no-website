import styles from "./footer.module.css";
import Instagram from "@/app/components/svg/instagram";
import Logo from "@/app/[lng]/components/svg/logo";
import Link from "next/link";
import MapLinks from "@/app/[lng]/components/layout/map-links";
import MapProjects from "@/app/[lng]/components/layout/map-projects";

const Footer = ({ lng }: { lng: string }) => {
  return (
    <footer className={styles.footer} data-scroll-section>
      <div className={styles.section}>
        <div className={styles.description}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <p>ma.ri.no est une auto-entreprise spécialisée dans le graphisme.</p>
        </div>
        <div className={styles.linksContainer}>
          <div className={styles.links}>
            <h4>Menu</h4>
            <ul>
              <MapLinks lng={lng} />
              <Link href={"/projects"}>projects</Link>
            </ul>
          </div>
          <div className={styles.links}>
            <h4>Projects</h4>
            <ul>
              <MapProjects lng={lng} />
            </ul>
          </div>
          <div className={styles.links}>
            <h4>Contact</h4>
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
          <p>Design by Déborah Marino and Nina Alin</p>
          <p>Developed by Nina Alin</p>
        </div>
        <div className={styles.legal}>
          <p>Mentions légales</p>
          <p>CGU</p>
          <p>CGV</p>
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
