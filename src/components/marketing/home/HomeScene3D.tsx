"use client";

import { Canvas } from "@react-three/fiber";
import { ComponentProps, Suspense, useEffect, useRef, useState } from "react";
import Stars3D from "./Stars3D";
import { OrbitControls, useProgress } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Planet3D } from "./Planet3D";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HomeScene3D = ({ ...props }: ComponentProps<"div">) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { progress, active } = useProgress();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (!active && progress === 100) {
        tl.to(overlayRef.current, {
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
        });
      }
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
      <Canvas camera={{ position: [0, 1, -5] }}>
        <fog attach="fog" args={["#000000", 1, 15]} />
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
          <Planet3D scale={0.15} />
        </Suspense>
        <Stars3D intensity={2} noOfPoints={2000} maxRange={40} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default HomeScene3D;
