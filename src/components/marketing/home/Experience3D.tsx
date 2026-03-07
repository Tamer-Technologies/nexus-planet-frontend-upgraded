"use client";

import { Html, PerspectiveCamera, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Planet3D } from "./Planet3D";
import { StarRepoCard } from "./StarRepoCard";
import Stars3D from "./Stars3D";
import useHomeAnim from "@/hooks/marketing/home/useHomeAnim";
import SpeedLines3d from "./SpeedLines3d";
import { useState } from "react";
import { useLandingPage } from "@/contexts/marketing/LandingPageContext";
import Blackhole3d from "./Blackhole3d";
import { degToRad } from "@/utils/threeUtils";
import { HOME_CONTENT } from "@/constants/marketing/home";

const FONT_URL = "/fonts/barlow-condensed-3d/700.ttf";

const data = HOME_CONTENT.hero;

export const Experience = () => {
  const { animRefs, getIsMotionReduced, setIsMotionReduced } = useLandingPage();
  const isMotionReduced = getIsMotionReduced();

  useHomeAnim({ animRefs, getIsMotionReduced, setIsMotionReduced });

  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (animRefs.environmentGroupRef.current) {
      const { rotationSpeed, direction } = animRefs.animationStateRef.current;

      animRefs.environmentGroupRef.current.rotation.y +=
        delta * rotationSpeed * direction;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault ref={animRefs.cameraRef} fov={50} />

      <group position={[0, 0.9, 0]} scale={0.25} ref={animRefs.titleRef}>
        <Text color="#999999" position={[0, 2.4, 0]} font={FONT_URL}>
          {data.welcome}
        </Text>

        <Text color="#fbbf24" position={[0, 1.2, 0]} font={FONT_URL}>
          {data.brand}
        </Text>
      </group>

      <group ref={animRefs.environmentGroupRef}>
        <Planet3D scale={0.15} />
        <Stars3D noOfPoints={10000} intensity={1.5} maxRange={90} />
      </group>

      <group ref={animRefs.starCardContRef} rotation={[0, 1, 0]} scale={0.15}>
        <group ref={animRefs.starCardRef} position={[11, 1.3, 0]} scale={0}>
          <Html transform position={[-0.7, 2.1, 0]}>
            <section>
              <h2>
                <a
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block  h-45 w-42"
                >
                  <span className="sr-only">{data.githubStarAria}</span>
                </a>
              </h2>
            </section>
          </Html>
          <StarRepoCard />
        </group>
        <SpeedLines3d
          hovered={hovered}
          scale={1.5}
          speed={isMotionReduced ? 0.05 : 0.5}
          position={[10.4, 3.6, -0.5]}
        />
      </group>

      <group position={[25.9, 0.5, -25]}>
        <Blackhole3d
          rotation={[degToRad(-20), degToRad(-210), degToRad(-100)]}
          speed={1}
        />
      </group>
    </>
  );
};
