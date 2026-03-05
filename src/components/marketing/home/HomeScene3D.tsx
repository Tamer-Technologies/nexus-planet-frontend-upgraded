"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Experience } from "./Experience3D";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Progress } from "@/components/ui/progress";
import { useLandingPage } from "@/contexts/marketing/LandingPageContext";
import { Button } from "@/components/ui/button";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomeScene3D = () => {
  const { progress } = useProgress();
  const loadingLayerRef = useRef<HTMLDivElement>(null);
  const { animRefs, setIsMotionReduced, getIsMotionReduced } = useLandingPage();
  const [isRendering, setIsRendering] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMotionReduced = getIsMotionReduced();

  useGSAP(
    () => {
      if (progress === 100) {
        gsap.to(loadingLayerRef.current, {
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 90%",
          onToggle: (self) => {
            setIsRendering(self.isActive);
          },
          onLeave: () => {
            gsap.set(".fixed-canvas-container", { autoAlpha: 0 });
            gsap.set(".reduce-motion-btn", { autoAlpha: 0 });
          },
          onEnterBack: () => {
            gsap.set(".fixed-canvas-container", { autoAlpha: 1 });
            gsap.set(".reduce-motion-btn", { autoAlpha: 1 });
          },
        });
      }
    },
    { scope: containerRef, dependencies: [progress] },
  );

  return (
    <div
      className="scroll-container relative w-full isolate h-[2000svh] bg-black"
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
        <Canvas
          frameloop={isRendering ? "always" : "never"}
          className="fixed-canvas-container"
        >
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
        <section className="absolute inset-0 flex justify-center items-center p-10 pointer-events-none">
          <h1>
            <span className="sr-only">WELCOME TO YOUR NEXUS PLANET</span>
          </h1>
          <p
            ref={animRefs.subTitleRef}
            className="uppercase font-bold font-barlow-condensed text-center text-2xl max-w-90 sm:text-3xl sm:max-w-113 lg:text-4xl lg:max-w-130 xl:text-6xl xl:max-w-220"
          >
            The self-hosted social media platform built for ultimate control and
            <span className="text-primary">&nbsp;privacy.</span>
          </p>
        </section>

        {/* blackhole chat */}
        <div aria-hidden={true} className="pointer-events-none">
          <div>
            <div className="absolute inset-0 left-1/2 top-1/2 font-black text-4xl lg:text-6xl text-white/70 font-barlow-condensed">
              <span className="-translate-1/2 inline-block blackhole-happy-face opacity-0">
                〃＾▽＾〃
              </span>
            </div>
            <div className="absolute inset-0 left-1/2 top-1/2 font-black text-4xl lg:text-6xl text-white/70 font-barlow-condensed">
              <span className="-translate-1/2 inline-block blackhole-cute-face opacity-0">
                ● ´ω｀●
              </span>
            </div>
            <div className="absolute inset-0 left-1/2 top-1/2 font-black text-4xl lg:text-6xl text-white/70 font-barlow-condensed">
              <span className="-translate-1/2 inline-block blackhole-explain-face opacity-0">
                ▰˘◡˘▰
              </span>
            </div>
          </div>

          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-72 blackhole-msg">
              <div className="absolute inset-0 -m-4 rounded-2xl bg-background/90 backdrop-blur-sm -z-10" />

              <p className="blackhole-msg-1 text-xl text-white/70 font-barlow-condensed">
                <span className="block font-bold text-primary">
                  OH FINALLY! A FRIEND
                </span>
                <span className="block blackhole-msg-1-2 opacity-0">
                  Ammm .. I mean .. you should be here to see what{" "}
                  <span className="font-bold text-primary">features </span> your
                  planet provides.
                </span>
              </p>

              <p className="blackhole-msg-2 absolute top-0 left-0 opacity-0 text-xl text-white/70 font-barlow-condensed">
                <span className="font-bold text-primary">Unfortunately </span>I
                will have to
                <span className="font-bold text-primary"> suck</span> you. Don’t
                worry tho, You won’t turn into spaghetti 🍝
              </p>
            </div>
          </div>
        </div>

        <Button
          className="absolute reduce-motion-btn bottom-5 right-5 font-semibold font-barlow-condensed text-lg cursor-none"
          variant={"default"}
          onClick={() => setIsMotionReduced(!isMotionReduced)}
        >
          {isMotionReduced ? "Enable Motion" : "Reduce Motion"}
        </Button>
      </div>
    </div>
  );
};

export default HomeScene3D;
