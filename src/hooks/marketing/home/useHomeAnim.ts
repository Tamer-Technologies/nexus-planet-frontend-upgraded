import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LandingAnimProps } from "@/contexts/marketing/LandingPageContext";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { degToRad } from "@/utils/threeUtils";

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

          gsap.set(".blackhole-happy-face", { autoAlpha: 0 });
          gsap.set(".blackhole-cute-face", { autoAlpha: 0 });
          gsap.set(".blackhole-explain-face", { autoAlpha: 0 });

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
              x: degToRad(5),
              y: degToRad(-5),
            },
            {
              x: degToRad(-5),
              y: degToRad(10),

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
                    delay: 3,
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
                y: degToRad(-45),
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
                y: isDesktop ? degToRad(-55) : degToRad(-45),
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

          tl.to(starCardContRef.current.position, {
            x: 3,
            z: 3,
            duration: 1.5,
            ease: "power3.in",
          })
            .to(starCardRef.current.scale, {
              x: 0,
              y: 0,
              z: 0,
            })
            .to(cameraRef.current.position, {
              x: 21.9,
              z: -21,
              duration: 2,
              ease: "power3.inOut",
            });

          tl.addLabel("to the black hole");

          tl.to(animationStateRef.current, { rotationSpeed: 0.002 }, "<30%")
            .set(".blackhole-happy-face", { autoAlpha: 1, delay: 0.8 })
            .fromTo(
              ".blackhole-msg",
              {
                xPercent: isDesktop ? 100 : 0,
                yPercent: isDesktop ? -170 : -200,
                scale: 0,
              },
              { duration: 1, scale: 1 },
            );

          tl.set(".blackhole-happy-face", { autoAlpha: 0, delay: 0.8 })
            .set(".blackhole-msg-1-2", { opacity: 1 })
            .set(".blackhole-cute-face", { autoAlpha: 1 });

          tl.addLabel("blackhole msg 1");

          tl.to(".blackhole-msg", { scale: 0, duration: 1, delay: 0.8 })
            .set(".blackhole-msg-1", { opacity: 0 })
            .set(".blackhole-msg-2", { opacity: 1 })
            .set(".blackhole-cute-face", { autoAlpha: 0 })
            .set(".blackhole-explain-face", { autoAlpha: 1 })
            .to(".blackhole-msg", { scale: 1, duration: 1 });

          tl.addLabel("blackhole msg 2");

          tl.to(".blackhole-msg", { scale: 0, duration: 1, delay: 0.8 })
            .set(".blackhole-explain-face", { autoAlpha: 0 })
            .to(cameraRef.current.position, {
              x: 25.1,
              z: -24.2,
              duration: 2,
              ease: "power3.inOut",
            });

          tl.addLabel("dive to the black hole");
        },
      );

      return () => split.revert();
    },
    { dependencies: [reducedMotion], revertOnUpdate: true },
  );
};

export default useHomeAnim;
