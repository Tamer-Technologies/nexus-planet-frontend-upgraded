"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { useProgress } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Experience } from "./Experience3D";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Progress } from "@/components/ui/progress";
import { useLandingPage } from "@/contexts/marketing/LandingPageContext";

const HomeScene3D = () => {
  const { progress } = useProgress();
  const loadingLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { subTitleRef } = useLandingPage();

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
      className="scroll-container relative w-full isolate h-[1400svh] bg-black"
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

      <div className="fixed inset-0">
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
        <section className="absolute inset-0 flex justify-center items-center p-10">
          <h1>
            <span className="sr-only">WELCOME TO YOUR NEXUS PLANET</span>
          </h1>
          <p
            ref={subTitleRef}
            className="uppercase font-bold font-barlow-condensed text-center text-2xl max-w-90 sm:text-3xl sm:max-w-113 lg:text-4xl lg:max-w-130 xl:text-6xl xl:max-w-220"
          >
            The self-hosted social media platform built for ultimate control and
            <span className="text-primary">&nbsp;privacy.</span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default HomeScene3D;
