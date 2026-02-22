"use client";

import { Canvas } from "@react-three/fiber";
import { ComponentProps, Suspense, useEffect, useRef, useState } from "react";
import Stars3D from "./Stars3D";
import {
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Planet3D } from "./Planet3D";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import { PlanetAnimationOptions } from "@/types/three-animations";

const HomeScene3D = ({ ...props }: ComponentProps<"div">) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const PlanetAnimationOptions = useRef<PlanetAnimationOptions>({ speed: 0.1 });

  const { progress, active } = useProgress();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (active || progress < 100 || !cameraRef.current) return;

      tl.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
      }).to(cameraRef.current.position, {
        z: -7,
        y: 1,
        duration: 2,
        ease: "power2.inOut",
      });
    },
    { dependencies: [active, progress] },
  );

  if (!isClient) return <div className="size-full bg-black" />;

  return (
    <div className="size-full bg-black" {...props}>
      <div
        className="absolute inset-0 bg-black z-50 flex justify-center items-center"
        ref={overlayRef}
      >
        <span className="font-bold text-8xl text-primary">
          {progress.toFixed(0)}%
        </span>
      </div>
      <Canvas camera={{ position: [0, 1, -5], fov: 50 }}>
        <fog attach="fog" args={["#000000", 1, 25]} />
        <EffectComposer>
          <Bloom
            intensity={1}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
        <ambientLight intensity={1} />
        <Suspense>
          <Planet3D
            scale={0.15}
            animationOptions={PlanetAnimationOptions.current}
          />
        </Suspense>
        <PerspectiveCamera makeDefault position={[0, 6, -40]} ref={cameraRef} />
        <Stars3D
          intensity={2}
          noOfPoints={2000}
          maxRange={40}
          animate={true}
          speed={0.1}
        />
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default HomeScene3D;
