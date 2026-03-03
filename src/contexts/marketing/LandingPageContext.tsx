"use client";

import { createContext, RefObject, useContext, useRef, useState } from "react";
import { Group, Object3DEventMap, PerspectiveCamera } from "three";
import * as THREE from "three";

export type LandingAnimProps = {
  animRefs: {
    cameraRef: RefObject<PerspectiveCamera | null>;
    environmentGroupRef: RefObject<Group<Object3DEventMap> | null>;
    starCardContRef: RefObject<Group<Object3DEventMap> | null>;
    starCardRef: RefObject<Group<Object3DEventMap> | null>;
    animationStateRef: RefObject<{
      rotationSpeed: number;
      direction: -1 | 1;
    }>;
    titleRef: RefObject<Group<Object3DEventMap> | null>;
    subTitleRef: RefObject<HTMLParagraphElement | null>;
  };
  getIsMotionReduced: () => boolean;
  setIsMotionReduced: (value: boolean) => void;
};

const LandingPageContext = createContext<LandingAnimProps | undefined>(
  undefined,
);

export const LandingPage = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isMotionReduced, setIsMotionReduced] = useState(false);

  function getIsMotionReduced() {
    return isMotionReduced;
  }

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const environmentGroupRef = useRef<THREE.Group>(null);
  const starCardContRef = useRef<THREE.Group>(null);
  const starCardRef = useRef<THREE.Group>(null);
  const titleRef = useRef<THREE.Group>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);

  const animationStateRef = useRef<{
    rotationSpeed: number;
    direction: -1 | 1;
  }>({
    rotationSpeed: 0.1,
    direction: -1,
  });

  return (
    <LandingPageContext.Provider
      value={{
        animRefs: {
          cameraRef,
          environmentGroupRef,
          starCardContRef,
          starCardRef,
          titleRef,
          animationStateRef,
          subTitleRef,
        },
        getIsMotionReduced,
        setIsMotionReduced,
      }}
    >
      {children}
    </LandingPageContext.Provider>
  );
};

export default LandingPageContext;

export const useLandingPage = () => {
  const context = useContext(LandingPageContext);
  if (context === undefined) {
    throw new Error("No value specified to LandingPageContext");
  }

  return context;
};
