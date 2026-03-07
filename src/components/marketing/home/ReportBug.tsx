"use client";

import { useGSAP } from "@gsap/react";
import ReportBugForm from "./ReportBugForm";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { HOME_CONTENT } from "@/constants/marketing/home";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const data = HOME_CONTENT.reportBug;

const ReportBug = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".section-header", {
        type: "lines",
        mask: "lines",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%",
        },
      });

      tl.from(split.lines, { yPercent: -100 })
        .from(".section-line", {
          clipPath: "inset(0% 0% 100% 0%)",
        })
        .from(".section-form", { autoAlpha: 0, yPercent: -10 });

      return () => split.revert();
    },
    { scope: containerRef },
  );

  return (
    <div className="pt-24 bg-background" ref={containerRef}>
      <section
        id="report-bug"
        className="min-h-svh bg-background py-32 px-10 size-full relative flex flex-col items-center gap-5"
      >
        <h2 className="section-header text-6xl text-center text-primary font-bold uppercase font-barlow-condensed flex flex-col items-center gap-5">
          <span>{data.title}</span>
          <div className="size-15">
            <svg
              width="319"
              height="350"
              viewBox="0 0 319 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-full"
            >
              <path
                d="M39.6396 170.001C55.8134 115.037 115.43 90.2028 147.5 95.5V350C121.467 343.492 77.2831 320.532 52.9189 274.001H0V260.001H46.5068C42.7536 250.518 39.8095 240.2 37.9141 229.001H0V215.001H36.1445C35.7212 209.994 35.5 204.828 35.5 199.5C35.5 194.127 35.8797 188.96 36.5957 184.001H0V170.001H39.6396ZM171 95.5C203.07 90.2028 262.687 115.037 278.86 170.001H318.5V184.001H281.904C282.62 188.96 283 194.127 283 199.5C283 204.828 282.779 209.994 282.355 215.001H318.5V229.001H280.586C278.69 240.2 275.746 250.518 271.993 260.001H318.5V274.001H265.581C241.217 320.532 197.033 343.492 171 350V95.5ZM71.25 95.1299C98.5001 -25.3705 222.184 -37.8949 245.25 95.1299C178 47.6301 105.5 66.63 71.25 95.1299Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </h2>
        <div className={`bg-primary w-px h-28 mx-auto section-line`} />
        <div className="w-full max-w-100 section-form">
          <ReportBugForm />
        </div>
      </section>
    </div>
  );
};

export default ReportBug;
