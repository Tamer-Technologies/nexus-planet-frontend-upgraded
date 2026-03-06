"use client";

import InfiniteGrid3d from "@/components/marketing/home/InfiniteGrid3d";
import { useGSAP } from "@gsap/react";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { createContext, RefObject, useContext, useEffect, useRef } from "react";

const PageTransitionContext = createContext<
  RefObject<gsap.core.Timeline | null> | undefined
>(undefined);

export const PageTransition = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const tlRef = useRef<gsap.core.Timeline>(null);
  const transLayerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(() => {
    tlRef.current = gsap.timeline({ paused: true });

    gsap.set(transLayerRef.current, { autoAlpha: 0 });

    tlRef.current.to(transLayerRef.current, { autoAlpha: 1, duration: 0.3 });
  });

  useEffect(() => {
    if (tlRef.current && tlRef.current.progress() > 0) {
      tlRef.current.reverse();
    }
  }, [pathname]);

  return (
    <PageTransitionContext.Provider value={tlRef}>
      <div
        className="fixed bg-black inset-0 z-50 cursor-none opacity-0"
        ref={transLayerRef}
      />
      {children}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (context === undefined) {
    throw new Error("No value specified to TransitionLinkProvider");
  }
  return context;
};
