"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cursorRef.current) {
      const xTo = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.15,
        ease: "power3",
      });
      const yTo = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.15,
        ease: "power3",
      });

      const moveMouse = (e: MouseEvent) => {
        xTo(e.clientX - 20);
        yTo(e.clientY - 20);
      };

      const clickMouse = () => {
        gsap.to(cursorRef.current, {
          scale: 1.5,
          backgroundColor: "rgba(255,255,255,0.1)",
          duration: 0.15,
          overwrite: "auto",
        });
      };

      const releaseMouse = () => {
        gsap.to(cursorRef.current, {
          scale: 1,
          overwrite: "auto",
          background: "transparent",
          duration: 0.15,
        });
      };

      window.addEventListener("mousemove", moveMouse);
      window.addEventListener("mousedown", clickMouse);
      window.addEventListener("mouseup", releaseMouse);

      return () => {
        window.removeEventListener("mousemove", moveMouse);
        window.removeEventListener("mousedown", clickMouse);
        window.removeEventListener("mouseup", releaseMouse);
      };
    }
  });

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 size-8 border-white/50 border-2 rounded-full z-101 pointer-events-none"
    />
  );
};

export default CustomCursor;
