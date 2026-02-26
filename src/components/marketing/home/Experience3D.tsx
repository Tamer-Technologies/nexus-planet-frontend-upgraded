"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Planet3D } from "./Planet3D";
import { StarRepoCard } from "./Star-repo-card";
import Stars3D from "./Stars3D";
import useHomeAnim from "@/hooks/marketing/home/useHomeAnim";
import SpeedLines3d from "./SpeedLines3d";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const {
    cameraRef,
    environmentGroupRef,
    starCardContRef,
    starCardRef,
    animationStateRef,
  } = useHomeAnim();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (environmentGroupRef.current) {
      const { rotationSpeed, direction } = animationStateRef.current;

      environmentGroupRef.current.rotation.y +=
        delta * rotationSpeed * direction;
    }
  });

  function handleNavigation(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

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

      <group
        ref={starCardContRef}
        rotation={[0, 1, 0]}
        scale={0.15}
        onClick={() => handleNavigation("https://github.com/")}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <StarRepoCard ref={starCardRef} position={[11, 1.3, 0]} scale={0} />
        <SpeedLines3d
          hovered={hovered}
          scale={1.5}
          position={[10.25, 3.3, 0]}
        />
      </group>
    </>
  );
};
