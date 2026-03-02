import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LandingAnimProps } from "@/contexts/marketing/LandingPageContext";

const useHomeAnim = ({
  cameraRef,
  starCardContRef,
  starCardRef,
  animationStateRef,
  landingTitleRef,
}: LandingAnimProps) => {
  useGSAP(() => {
    if (
      !cameraRef.current ||
      !starCardContRef.current ||
      !starCardRef.current ||
      !landingTitleRef.current
    )
      return;

    cameraRef.current.lookAt(0, 0, 0);

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
        snap: {
          snapTo: "labels",
          delay: 0,
        },
      },
    });

    // zoom in
    tl.from(cameraRef.current.position, {
      z: 25,
      y: 5,
      ease: "power3.inOut",
    });

    tl.addLabel("start");

    // dive close to the planet
    tl.to(cameraRef.current.position, {
      z: 2.15,
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
        landingTitleRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.5,
        },
        "<30%",
      );

    tl.addLabel("dive");

    // rotate to the star repo card
    tl.to(animationStateRef.current, {
      rotationSpeed: 1.5,
      duration: 0.5,
    })
      .to(starCardRef.current.scale, {
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
        { y: THREE.MathUtils.degToRad(-55), duration: 2 },
        "<",
      )

      .to(
        animationStateRef.current,
        { rotationSpeed: 0.1, duration: 1 },
        "<50%",
      );

    tl.addLabel("star-repo");
  });
};

export default useHomeAnim;
