import { useGSAP } from "@gsap/react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import * as THREE from "three";
import { Planet3D } from "./Planet3D";
import { StarRepoCard } from "./Star-repo-card";
import Stars3D from "./Stars3D";

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const environmentGroupRef = useRef<THREE.Group>(null);
  const starCardContRef = useRef<THREE.Group>(null);
  const starCardRef = useRef<THREE.Group>(null);

  const animationState = useRef<{ rotationSpeed: number; direction: -1 | 1 }>({
    rotationSpeed: 0.1,
    direction: -1,
  });

  useFrame((_, delta) => {
    if (environmentGroupRef.current) {
      const { rotationSpeed, direction } = animationState.current;

      environmentGroupRef.current.rotation.y +=
        delta * rotationSpeed * direction;
    }
  });

  useGSAP(() => {
    if (!cameraRef.current || !starCardContRef.current || !starCardRef.current)
      return;

    cameraRef.current.lookAt(0, 0, 0);

    // Scroll Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        snap: {
          snapTo: "labelsDirectional",
          delay: 0,
        },
      },
    });

    tl.from(cameraRef.current.position, {
      z: 25,
      y: 5,
      ease: "power3.inOut",
    });

    tl.addLabel("start");

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
      );

    tl.addLabel("dive");

    tl.to(animationState.current, {
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

      .to(animationState.current, { rotationSpeed: 0.1, duration: 1 }, "<50%");

    tl.addLabel("star-repo");
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        fov={50}
        position={[0, 1, 5]}
      />

      <group ref={environmentGroupRef}>
        <Planet3D scale={0.15} />
        <Stars3D noOfPoints={1000} intensity={1.5} maxRange={30} />
      </group>

      <group ref={starCardContRef} rotation={[0, 1, 0]} scale={0.15}>
        <StarRepoCard ref={starCardRef} position={[11, 1.3, 0]} scale={0} />
      </group>
    </>
  );
};
