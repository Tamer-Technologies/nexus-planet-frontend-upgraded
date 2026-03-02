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
import { useLandingPage } from "@/contexts/marketing/LandingPageContext";

const FONT_URL = "/fonts/barlow-condensed-3d/700.ttf";

gsap.registerPlugin(ScrollTrigger);

export const Experience = () => {
  const animRefs = useLandingPage();

  useHomeAnim(animRefs);

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
      <PerspectiveCamera
        makeDefault
        ref={animRefs.cameraRef}
        fov={50}
        position={[0, 1, 5]}
      />

      <Html>
        <section>
          <h1>
            <span className="sr-only">WELCOME TO YOUR NEXUS PLANET</span>
          </h1>
          {/* <p className="uppercase font-semibold font-barlow-condensed text-center text-6xl w-80">
            The self-hosted social media platform built for ultimate control and
            privacy.
          </p> */}
        </section>
      </Html>

      <group position={[0, 0.9, 0]} scale={0.25} ref={animRefs.landingTitleRef}>
        <Text color="#999999" position={[0, 2.4, 0]} font={FONT_URL}>
          WELCOME TO YOUR
        </Text>

        <Text color="#fbbf24" position={[0, 1.2, 0]} font={FONT_URL}>
          NEXUS PLANET
        </Text>
      </group>

      {/* <group rotation={[0, -0.8, 0]}>
        <group position={[1.53, 0.5, 0]} scale={0.05}>
          <Text color="#666666" position={[0, 0, 0]} font={FONT_URL}>
            The self-hosted social media platform
          </Text>
          <Text color="#666666" position={[0, -1.2, 0]} font={FONT_URL}>
            built for ultimate control and
          </Text>
          <Text color="#666666" position={[0, -2.4, 0]} font={FONT_URL}>
            privacy
          </Text>
        </group>
      </group> */}

      <group ref={animRefs.environmentGroupRef}>
        <Planet3D scale={0.15} />
        <Stars3D noOfPoints={1000} intensity={1.5} maxRange={30} />
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
