import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LandingAnimProps } from "@/contexts/marketing/LandingPageContext";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const useHomeAnim = ({
  animRefs: {
    cameraRef,
    starCardContRef,
    starCardRef,
    animationStateRef,
    titleRef,
    subTitleRef,
  },
  getIsMotionReduced,
}: LandingAnimProps) => {
  const reducedMotion = getIsMotionReduced();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const split = SplitText.create(subTitleRef.current, {
        type: "lines",
        mask: "lines",
      });

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (context) => {
          if (
            !cameraRef.current ||
            !starCardContRef.current ||
            !starCardRef.current ||
            !titleRef.current
          )
            return;

          cameraRef.current.lookAt(0, 0, 0);

          const { isDesktop } = context.conditions as {
            isDesktop: boolean;
            reducedMotion: boolean;
          };

          if (reducedMotion) {
            animationStateRef.current.rotationSpeed = 0.02;
          } else {
            animationStateRef.current.rotationSpeed = 0.1;
          }

          gsap.set(cameraRef.current.position, {
            x: 0,
            y: 0.9,
            z: 5,
          });

          cameraRef.current.lookAt(0, isDesktop ? 0.2 : 0.5, 0);
          // initial animations

          gsap.fromTo(
            starCardRef.current.rotation,
            {
              x: THREE.MathUtils.degToRad(5),
              y: THREE.MathUtils.degToRad(-5),
            },
            {
              x: THREE.MathUtils.degToRad(-5),
              y: THREE.MathUtils.degToRad(10),

              duration: 4,
              ease: "power1.inOut",
              yoyo: true,
              repeat: -1,
            },
          );

          gsap.to(starCardRef.current.position, {
            y: 1.6,
            duration: 4,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });

          // Scroll Animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".scroll-container",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              snap: reducedMotion
                ? undefined
                : {
                    snapTo: "labelsDirectional",
                    delay: 0,
                    duration: 5,
                  },
            },
          });

          // zoom in
          tl.from(cameraRef.current.position, {
            z: reducedMotion ? 5 : 25,
            y: reducedMotion ? 0.9 : 3,
            ease: "power3.inOut",
          });

          tl.addLabel("start");

          // dive close to the planet
          tl.to(cameraRef.current.position, {
            z: 2.19,
            y: 0.5,
            duration: 1,
            ease: "power3.inOut",
          })

            .to(
              cameraRef.current.rotation,
              {
                x: 0,
                y: THREE.MathUtils.degToRad(-45),
                duration: 0.8,
                ease: "power3.inOut",
              },
              "<20%",
            )
            .to(
              titleRef.current.scale,
              {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.4,
              },
              "<50%",
            );

          tl.fromTo(
            split.lines,
            { yPercent: 100, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              ease: "power3.inOut",
              stagger: 0.1,
            },
          );

          tl.addLabel("sub title");

          // rotate to the star repo card
          tl.to(split.lines, {
            yPercent: 100,
            autoAlpha: 0,
            ease: "power3.inOut",
            delay: 0.2,
            stagger: {
              each: 0.1,
              from: "end",
            },
          });

          tl.to(animationStateRef.current, {
            rotationSpeed: reducedMotion ? 0.02 : 1.5,
            duration: 0.5,
          });

          tl.to(starCardRef.current.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0,
          })

            .to(starCardRef.current.scale, {
              x: 1,
              y: 1,
              z: 1,
              duration: 1,
            })
            .to(
              starCardContRef.current.rotation,
              {
                y: isDesktop
                  ? THREE.MathUtils.degToRad(-55)
                  : THREE.MathUtils.degToRad(-45),
                duration: 0.8,
              },
              "<",
            );

          tl.to(
            animationStateRef.current,
            { rotationSpeed: reducedMotion ? 0.02 : 0.1, duration: 1 },
            "<50%",
          );

          tl.addLabel("star-repo");
        },
      );

      return () => split.revert();
    },
    { dependencies: [reducedMotion], revertOnUpdate: true },
  );
};

export default useHomeAnim;
