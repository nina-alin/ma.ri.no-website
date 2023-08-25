import Image from "next/image";

import MoreButton from "@/app/[lng]/components/buttons/more-button";
import styles from "@/app/[lng]/page.module.css";

import placeholder from "../../../../public/placeholder.png";

const AboutMeSection = () => (
  <div className={styles.aboutMe}>
    <div className={styles.aboutMeContent}>
      <h2
        className={styles.aboutMeTitle}
        data-scroll
        data-scroll-speed="2"
        data-scroll-delay="0.2"
      >
        A world of creativity
      </h2>
      <Image
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="-2"
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
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea
      </p>
    </div>
    <MoreButton />
  </div>
);

export default AboutMeSection;
