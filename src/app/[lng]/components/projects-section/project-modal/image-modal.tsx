"use client";

import { Types } from "@prisma/client";
import gsap from "gsap";
import Image from "next/image";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";

import { LngContext } from "@/app/[lng]/components/layout/navbar/navbar-client";
import styles from "@/app/[lng]/components/projects-section/project-modal/image-from-gallery.module.css";
import AnimatedButton from "@/app/components/gsap/animated-button";
import ArrowLeft from "@/app/components/svg/arrow-left";
import ArrowRight from "@/app/components/svg/arrow-right";
import { PostWithType } from "@/types/posts";
import pickColorBasedOnBackground from "@/utils/pick-color-based-on-background";

interface ImageModalProperties {
  onClose: () => void;
  posts: PostWithType[];
  goToPrevious: () => void;
  goToNext: () => void;
  currentIndex: number;
  numberOfPosts: number;
}

const ImageModal = ({
  onClose,
  posts,
  goToPrevious,
  goToNext,
  currentIndex,
  numberOfPosts,
}: ImageModalProperties) => {
  const reference = useRef<HTMLDivElement>(null);
  const modalReference = useRef<HTMLDivElement>(null);
  const lng = useContext(LngContext);

  const textColor = pickColorBasedOnBackground(
    posts[currentIndex].displayColor,
  );

  const onWheel = (
    event: UIEvent & {
      deltaY: number;
    },
  ) => {
    const element = reference.current;
    if (element) {
      if (event.deltaY == 0) return;
      element.scrollTo({
        left: element.scrollLeft + event.deltaY,
      });
    }
  };

  const displayTags = (type: Types[]) => {
    return type
      ?.map((tag) =>
        lng === "en" ? tag.nameEn : (lng === "fr" ? tag.nameFr : tag.nameJp),
      )
      .join(", ");
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    const animation = gsap.context(() => {
      gsap.from("#bla", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.2,
      });
    }, modalReference);

    return () => animation.revert();
  }, [modalReference]);
  // TODO
  /*
                          useLayoutEffect(() => {
                            const pageContainer = document.querySelector("#container");
                
                            if (!scroll) {
                              (async () => {
                                const LocomotiveScroll = (await import("locomotive-scroll")).default;
                
                                setScroll(
                                    new LocomotiveScroll({
                                      el: pageContainer,
                                      smooth: true,
                                      smoothMobile: true,
                                      resetNativeScroll: true,
                                      multiplier: 0.5,
                                    }),
                                );
                
                              })();
                            }
                                const animation = gsap.context(async () => {
                              gsap.registerPlugin(ScrollTrigger);
                
                
                              scroll.on("scroll", ScrollTrigger.update);
                
                              ScrollTrigger.scrollerProxy(pageContainer, {
                                scrollTop(value) {
                                  return arguments.length
                                      ? scroll.scrollTo(value, 0, 0)
                                      : scroll.scroll.instance.scroll.y;
                                },
                                getBoundingClientRect() {
                                  return {
                                    left: 0,
                                    top: 0,
                                    width: window.innerWidth,
                                    height: window.innerHeight
                                  };
                                },
                                pinType: pageContainer.style.transform ? "transform" : "fixed"
                              });
                
                              window.addEventListener("load", function () {
                                let pinBoxes = document.querySelectorAll("#horizontalScroll > *");
                                let pinWrap = document.querySelector("#horizontalScroll");
                                let pinWrapWidth = pinWrap.offsetWidth;
                                let horizontalScrollLength = pinWrapWidth - window.innerWidth;
                
                                gsap.to("#horizontalScroll", {
                                  scrollTrigger: {
                                    scroller: pageContainer, //locomotive-scroll
                                    scrub: true,
                                    trigger: "#sectionPin",
                                    pin: true,
                                    // anticipatePin: 1,
                                    start: "top top",
                                    end: pinWrapWidth
                                  },
                                  x: -horizontalScrollLength,
                                  ease: "none"
                                });
                
                                ScrollTrigger.addEventListener("refresh", () => scroll.update());
                
                                ScrollTrigger.refresh();
                              });
                
                            }, scrollRef);
                
                            return () => {
                              animation.revert();
                              scroll && scroll.destroy();
                            }
                
                          }, [scroll])
                
                           */

  console.log(currentIndex, numberOfPosts);

  return (
    <div
      id={"container"}
      className={styles.modalContent}
      onClick={() => onClose()}
    >
      <div
        ref={modalReference}
        className={styles.modal}
        style={{ backgroundColor: posts[currentIndex].displayColor }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.titles}>
            <h3
              className={styles.title}
              id={"#bla"}
              style={{ color: textColor }}
            >
              {lng === "en"
                ? posts[currentIndex].titleEn
                : (lng === "fr"
                ? posts[currentIndex].titleFr
                : posts[currentIndex].titleJp)}
            </h3>
            <p className={styles.subtitle} style={{ color: textColor }}>
              {posts[currentIndex].year} /{" "}
              {displayTags(posts[currentIndex].type)}
            </p>
          </div>
          <button
            className={styles.close}
            onClick={onClose}
            style={{ color: textColor }}
          >
            X
          </button>
        </div>
        <div
          id={"horizontalScroll"}
          className={styles.images}
          ref={reference}
          // @ts-ignore
          onWheel={onWheel}
        >
          <Image
            key={currentIndex}
            className={styles.imageModal}
            src={posts[currentIndex].mainImageUrl}
            alt={"main image from gallery"}
            width={100}
            height={100}
            unoptimized={true}
          />
          {posts[currentIndex].imagesUrl.map((image: string) => (
            <Image
              key={image}
              className={styles.imageModal}
              src={image}
              alt={"image from gallery"}
              width={100}
              height={100}
              unoptimized={true}
            />
          ))}
        </div>
        <div className={styles.description} style={{ color: textColor }}>
          {lng === "en"
            ? posts[currentIndex].contentEn
            : (lng === "fr"
            ? posts[currentIndex].contentFr
            : posts[currentIndex].contentJp)}
        </div>
        <div className={styles.actions}>
          {currentIndex === 0 ? (
            <div />
          ) : (
            <AnimatedButton
              text={"Previous project"}
              id={"previous-project"}
              className={styles.button}
              icon={<ArrowLeft color={textColor} />}
              onClick={goToPrevious}
              style={{ color: textColor, border: `2px solid ${textColor}` }}
              direction={"left"}
            />
          )}
          {currentIndex + 1 !== numberOfPosts && (
            <AnimatedButton
              text={"Next project"}
              id={"next-project"}
              className={styles.button}
              icon={<ArrowRight color={textColor} />}
              onClick={goToNext}
              style={{ color: textColor, border: `2px solid ${textColor}` }}
              direction={"right"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
