"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useProgress } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Experience } from "./Experience3D";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Progress } from "@/components/ui/progress";

const HomeScene3D = () => {
  const { progress } = useProgress();
  const loadingLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    { scope: containerRef, dependencies: [progress] },
  );

  return (
    <div
      className="scroll-container relative w-full isolate h-[1000svh] bg-black"
      ref={containerRef}
    >
      <div
        ref={loadingLayerRef}
        className="fixed inset-0 bg-black z-50 flex flex-col justify-center items-center"
      >
        <span className="font-bold text-8xl text-primary">
          {progress.toFixed(0)}%
        </span>
        <Progress value={progress} className="w-[60%] max-w-200" />
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
          <ambientLight intensity={2} />
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default HomeScene3D;
