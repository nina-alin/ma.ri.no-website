import { Alert } from "@prisma/client";
import Image from "next/image";

import AboutMeSection from "@/app/[lng]/components/about-me-section";
import HomeClient from "@/app/[lng]/components/home-client";
import MyStorySection from "@/app/[lng]/components/my-story-section";
import TypesClient from "@/app/[lng]/components/projects-section/types/types-client";
import Logo from "@/app/[lng]/components/svg/logo";
import { translate } from "@/app/i18n";
import { prisma } from "@/lib/prisma";

import logoBackground from "../../../public/logoBackground.jpg";
import styles from "./page.module.css";

interface Home {
  params: {
    lng: string;
  };
}

const getAlert = async () => {
  return prisma.alert.findFirst();
};

const getTypes = async () => {
  return prisma.types.findMany();
};

const Home = async ({ params: { lng } }: Home) => {
  const { t } = await translate(lng);

  const types = await getTypes();
  const alert = (await getAlert()) as Alert;

  return (
    <HomeClient lng={lng}>
      <div className={styles.main}>
        {alert.status === "enabled" && (
          <div className={styles.alert}>
            <h3>
              {lng === "fr"
                ? alert.titleFr
                : (lng === "en"
                ? alert.titleEn
                : alert.titleJp)}
            </h3>
            <p>
              {lng === "fr"
                ? alert.contentFr
                : (lng === "en"
                ? alert.contentEn
                : alert.contentJp)}
            </p>
          </div>
        )}
        <div className={styles.hero}>
          <div className={styles.backgroundLogo} id={"background-logo"}>
            <Image
              src={logoBackground}
              alt={"logo background"}
              width={"1000"}
              height={"500"}
            />
            <h1
              id={"name"}
              className={styles.name}
              data-scroll
              data-scroll-speed="1"
              data-scroll-delay="0.2"
            >
              Déborah Marino デボラ マリノ
            </h1>
            <p className={styles.textOverImage}>
              <span className={styles.backgroundLogoTitle}>
                {t("home.creative-director")}/<br />
                {t("home.graphic-designer")}
              </span>
              <br /> <br />
              <span className={styles.backgroundLogoText}>
                {t("home.graphic-design")}
                <br />
                {t("home.illustration")}
                <br />
                {t("home.packaging-branding")}
                <br />
                {t("home.creative-concepts")}
              </span>
            </p>
          </div>
          <Logo />
        </div>
        <AboutMeSection />
        <MyStorySection t={t} />
        <TypesClient types={types} />
      </div>
    </HomeClient>
  );
};

export default Home;
