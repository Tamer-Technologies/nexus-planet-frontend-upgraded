"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useProgress } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Experience } from "./Experience3D";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HomeScene3D = () => {
  const { progress } = useProgress();
  const loadingLayerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (progress === 100) {
        gsap.to(loadingLayerRef.current, {
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [progress] },
  );

  return (
    <div className="scroll-container relative w-full h-[1000svh] bg-black">
      <div
        ref={loadingLayerRef}
        className="fixed inset-0 bg-black z-50 flex justify-center items-center"
      >
        <span className="font-bold text-8xl text-primary">
          {progress.toFixed(0)}%
        </span>
      </div>

      <div className="fixed inset-0 z-0">
        <Canvas>
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
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default HomeScene3D;
