import { Alert } from "@prisma/client";
import Image from "next/image";

import HomeClient from "@/app/[lng]/components/home-client";
import TypesClient from "@/app/[lng]/components/projects-section/types/types-client";
import Logo from "@/app/[lng]/components/svg/logo";
import AnimatedButton from "@/app/components/gsap/animated-button";
import { LocomotiveScrollAppProvider } from "@/app/components/locomotive-scroll/locomotive-scroll-app-provider";
import ArrowRight from "@/app/components/svg/arrow-right";
import { translate } from "@/app/i18n";
import { prisma } from "@/lib/prisma";

import logoBackground from "../../../public/logoBackground.jpg";
import placeholder from "../../../public/placeholder.png";
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
    <LocomotiveScrollAppProvider>
      <HomeClient lng={lng}>
        <div className={styles.main} data-scroll-section>
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
          <div className={styles.aboutMe}>
            <div className={styles.aboutMeContent}>
              <h2
                className={styles.aboutMeTitle}
                data-scroll
                data-scroll-speed="1"
                data-scroll-delay="0.2"
              >
                A world of creativity
              </h2>
              <Image
                className={styles.aboutMeImage}
                src={placeholder}
                alt={"placeholder"}
                width={"1000"}
                height={"500"}
              />
              <p
                className={styles.aboutMeText}
                data-scroll
                data-scroll-speed="2"
                data-scroll-delay="0.2"
              >
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea
              </p>
            </div>
            <AnimatedButton
              text={t("home.more")}
              id={"see-more"}
              icon={<ArrowRight color={styles.arrowRight} />}
              className={styles.more}
              direction={"right"}
            />
          </div>
          <div className={styles.myStory}>
            <Image
              src={placeholder}
              alt={"placeholder"}
              width={"700"}
              height={"600"}
            />
            <div className={styles.myStoryAbout}>
              <h2
                className={styles.myStoryTitle}
                data-scroll
                data-scroll-speed="1"
                data-scroll-delay="0.2"
              >
                {t("home.my-story")}
              </h2>
              <p
                className={styles.myStoryText}
                data-scroll
                data-scroll-speed="2"
                data-scroll-delay="0.2"
              >
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euis
              </p>
              <AnimatedButton
                text={t("home.discover-my-story")}
                id={"discover-my-story"}
                icon={<ArrowRight color={styles.arrowRightAbout} />}
                className={styles.discover}
                direction={"right"}
              />
            </div>
          </div>
          <TypesClient
            types={types}
            translations={{
              all: t("home.all"),
              projectGallery: t("home.projects-gallery"),
            }}
          />
        </div>
      </HomeClient>
    </LocomotiveScrollAppProvider>
  );
};

export default Home;
