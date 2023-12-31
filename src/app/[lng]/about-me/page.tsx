import Image from "next/image";
import React from "react";

import AboutMeClient from "@/app/[lng]/about-me/components/about-me-client";

import bubble1 from "../../../../public/bubble-1.png";
import bubble2 from "../../../../public/bubble-2.png";
import bubble3 from "../../../../public/bubble-3.png";
import bubble4 from "../../../../public/bubble-4.png";
import color1 from "../../../../public/color-1.png";
import color2 from "../../../../public/color-2.png";
import menThinking from "../../../../public/men-thinking.png";
import styles from "./page.module.css";

const AboutMe = async () => {
  return (
    <AboutMeClient>
      <div className={styles.page}>
        <div className={styles.colorImages}>
          <div className={styles.image1}>
            <Image
              id={"color1"}
              className={styles.color1}
              src={color1}
              width={5000}
              height={5000}
              alt={"color-1"}
            />
            <h2
              data-scroll
              data-scroll-speed="1"
              data-scroll-delay="0.15"
              className={styles.titleEn}
            >
              A world of creativity
            </h2>
            <h2
              data-scroll
              data-scroll-speed="1"
              data-scroll-delay="0.085"
              className={styles.titleFr}
            >
              Un monde de créativité
            </h2>
            <h2
              data-scroll
              data-scroll-speed="1"
              data-scroll-delay="0.065"
              className={styles.titleJp}
            >
              創造性の 世界
            </h2>
          </div>
          <Image
            id={"color2"}
            className={styles.color2}
            src={color2}
            width={5000}
            height={5000}
            alt={"color-2"}
          />
        </div>
      </div>
      <div className={styles.menThinkingContainer}>
        <Image
          src={menThinking}
          className={styles.menThinking}
          width={5000}
          height={5000}
          alt={"men thinking"}
          data-scroll
          data-scroll-speed="1"
        />
        <div className={styles.bubbles}>
          <Image
            className={styles.bubble4}
            src={bubble4}
            width={100}
            height={100}
            data-scroll
            data-scroll-speed="1"
            data-scroll-delay="0.15"
            alt={"bubble 4"}
          />
          <Image
            className={styles.bubble3}
            src={bubble3}
            width={100}
            height={100}
            alt={"bubble 3"}
            data-scroll
            data-scroll-speed="1"
            data-scroll-delay="0.055"
          />
          <Image
            className={styles.bubble2}
            src={bubble2}
            width={100}
            height={100}
            alt={"bubble 2"}
            data-scroll
            data-scroll-speed="1"
            data-scroll-delay="0.035"
          />
          <Image
            className={styles.bubble1}
            src={bubble1}
            width={100}
            height={100}
            alt={"bubble 1"}
            data-scroll
            data-scroll-speed="1"
            data-scroll-delay="0.095"
          />
        </div>
      </div>
      <div className={styles.text}>
        <div className={styles.text1}>
          <p data-scroll data-scroll-speed="2">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait
            nulla facilisi. Lorem ipsum dolor sit amet, cons
          </p>
        </div>
        <div className={styles.text2}>
          <p data-scroll data-scroll-speed="2">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait
            nulla facilisi. Lorem ipsum dolor sit amet, cons
          </p>
        </div>
      </div>
    </AboutMeClient>
  );
};

export default AboutMe;
