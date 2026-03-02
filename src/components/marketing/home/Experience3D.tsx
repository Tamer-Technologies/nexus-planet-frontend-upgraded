"use client";

import { Html, PerspectiveCamera, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Planet3D } from "./Planet3D";
import { StarRepoCard } from "./StarRepoCard";
import Stars3D from "./Stars3D";
import useHomeAnim from "@/hooks/marketing/home/useHomeAnim";
import SpeedLines3d from "./SpeedLines3d";
import { useState } from "react";

const FONT_URL = "/fonts/barlow-condensed-3d/700.ttf";

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

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        fov={50}
        position={[0, 1, 5]}
      />

      <Html transform position={[-0.5, 1.5, 0]}>
        <section>
          <h1>
            <span className="sr-only">WELCOME TO YOUR NEXUS PLANET</span>
          </h1>
        </section>
      </Html>

      <group position={[-0.5, 1.5, 0]} scale={0.25}>
        <Text color="white" position={[2, 0, 0]} font={FONT_URL}>
          WELCOME TO YOUR
        </Text>

        <Text color="#fbbf24" position={[2, -1.2, 0]} font={FONT_URL}>
          NEXUS PLANET
        </Text>
      </group>

      <group ref={environmentGroupRef}>
        <Planet3D scale={0.15} />
        <Stars3D noOfPoints={1000} intensity={1.5} maxRange={30} />
      </group>

      <group ref={starCardContRef} rotation={[0, 1, 0]} scale={0.15}>
        <group ref={starCardRef} position={[11, 1.3, 0]} scale={0}>
          <Html transform position={[-0.7, 2.1, 0]}>
            <section>
              <h2>
                <a
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-none h-45 w-42"
                >
                  <span className="sr-only">Star our repo in github</span>
                </a>
              </h2>
            </section>
          </Html>
          <StarRepoCard />
        </group>
        <SpeedLines3d
          hovered={hovered}
          scale={1.5}
          position={[10.4, 3.6, -0.5]}
        />
      </group>
    </>
  );
};
