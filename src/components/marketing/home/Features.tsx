"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Fragment, useRef } from "react";

gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

const featuresList = [
  {
    label: "SOVEREIGNTY",
    description:
      "Install Nexus Planet on any private server or VPS. You manage user access, storage, and moderation rules. Your private server is your universe, completely dedicated to your community's needs and governance.",
  },
  {
    label: "COMMUNICATION",
    description:
      "Create dedicated servers (communities) that host multiple text and voice channels, just like the tools you love. Enjoy direct messaging and group calls with a modern, intuitive interface. All communications utilize end-to-end encryption.",
  },
  {
    label: "CUSTOMIZATION",
    description:
      "Extensive API and modification tools allow deep customization of themes, functionalities, and integrations. Nexus Planet is a starting point, not a finished product—you decide what it becomes.",
  },
];

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        },
        defaults: {
          ease: "power2.inOut",
        },
      });

      const splits: globalThis.SplitText[] = [];

      const mainTitleSplit = SplitText.create(".section-title", {
        type: "lines",
        mask: "lines",
      });
      splits.push(mainTitleSplit);

      tl.from(mainTitleSplit.lines, { yPercent: 100, duration: 1 }).from(
        ".section-svg",
        {
          drawSVG: "100% 100%",
          duration: 1,
        },
      );

      featuresList.forEach((item, index) => {
        const titleSplit = SplitText.create(`.feature-title-${index + 1}`, {
          type: "lines",
          mask: "lines",
        });
        const descSplit = SplitText.create(
          `.feature-description-${index + 1}`,
          { type: "lines", mask: "lines" },
        );

        splits.push(titleSplit, descSplit);

        tl.from(titleSplit.lines, { yPercent: 100 });

        tl.from(descSplit.lines, { yPercent: 100 });

        if (index !== featuresList.length - 1) {
          tl.from(`.separation-line-${index + 1}`, {
            clipPath: "inset(0% 0% 100% 0%)",
          });
        }
      });

      return () => {
        splits.forEach((item) => item.revert());
      };
    },
    { scope: containerRef },
  );

  return (
    <section className="bg-black relative min-h-svh pt-24" ref={containerRef}>
      <div className="flex flex-col items-center py-32 px-10 gap-28.75">
        <div className="relative">
          <h2 className="text-6xl text-primary font-bold uppercase font-barlow-condensed section-title">
            Features
          </h2>
          <svg
            width="14"
            height="103"
            viewBox="0 0 14 103"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[90%] left-[42%]"
          >
            <path
              d="M13.5 103V39H0.5V0"
              stroke="#EAAE2C"
              className="section-svg"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-2 max-w-68 text-center">
          {featuresList.map((item, index) => (
            <Fragment key={item.label}>
              <div
                className={`uppercase font-barlow-condensed flex flex-col gap-2.5  
                `}
              >
                <h3
                  className={`text-4xl text-primary font-bold feature-title-${index + 1}`}
                >
                  {item.label}
                </h3>
                <p className={`feature-description-${index + 1}`}>
                  {item.description}
                </p>
              </div>
              {index !== featuresList.length - 1 && (
                <div
                  className={`bg-primary w-px h-28 mx-auto separation-line-${index + 1}`}
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
