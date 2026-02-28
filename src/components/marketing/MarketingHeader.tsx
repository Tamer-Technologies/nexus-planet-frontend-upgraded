"use client";

import Logo from "@/components/icons/logo";
import BurgerMenu from "@/components/icons/burger-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { marketingHeaderNavs } from "@/constants/marketing/marketingHeader";
import { cn } from "@/lib/utils";
import { LinkObject } from "@/types/constants";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TransitionLink from "../utils/TransitionLink";

const NavList = ({
  items,
  className,
  containerClassName,
}: {
  items: LinkObject[];
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <>
      {items.map((item) => (
        <div key={item.label} className={containerClassName}>
          <Button
            asChild
            cursor="noCursor"
            variant="lite"
            className={cn(
              "font-barlow-condensed uppercase font-semibold",
              className,
            )}
          >
            <TransitionLink href={item.url}>{item.label}</TransitionLink>
          </Button>
        </div>
      ))}
    </>
  );
};

const MarketingHeader = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuIconRef = useRef<SVGSVGElement>(null);

  const tl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      if (!menuRef.current || !menuIconRef.current) return;

      tl.current = gsap.timeline({
        paused: true,
        defaults: { duration: 0.3 },
      });

      tl.current
        .to(menuIconRef.current, {
          rotate: 45,
          ease: "power2.inOut",
        })
        .to(
          menuRef.current,
          {
            height: "auto",
            ease: "power2.out",
          },
          "<",
        )
        .to(menuRef.current, {
          width: "auto",
          ease: "power2.inOut",
        })
        .from(
          ".menu-button",
          {
            xPercent: 110,
            ease: "power2.out",
            stagger: 0.1,
          },
          "<50%",
        );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    if (!tl.current) return;

    if (isMenuOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuOpen]);

  return (
    <header
      className="fixed flex w-full items-center top-0 left-0 z-50 p-7 gap-5"
      ref={containerRef}
    >
      <Logo className="-translate-y-[15%] mr-auto pointer-events-none" />

      <nav aria-label="Main Navigation" className="flex items-center gap-5">
        <div className="max-md:hidden flex items-center gap-5">
          <NavList items={marketingHeaderNavs.ctas} className="text-xl" />
        </div>

        <Button
          variant="lite"
          cursor={"noCursor"}
          size={"auto"}
          className="group p-3"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setisMenuOpen(!isMenuOpen)}
        >
          <BurgerMenu ref={menuIconRef} />
        </Button>

        <div
          ref={menuRef}
          className="absolute top-25 right-14.5 rounded-4xl border-2 border-accent/50 bg-primary-foreground/90 backdrop-blur-md size-0 overflow-hidden flex flex-col items-end"
        >
          <div className="px-5 py-10 flex flex-col items-end gap-20 w-[80vw] max-w-90 max-h-2000 overflow-x-hidden overflow-y-auto">
            <div className="flex flex-col gap-5 items-end">
              <NavList
                items={marketingHeaderNavs.sections}
                className="text-3xl"
                containerClassName="menu-button"
              />
            </div>
            <div className="md:hidden flex flex-col gap-5 items-end mt-auto border-t border-accent/20 pt-5 w-full">
              <NavList
                items={marketingHeaderNavs.ctas}
                className="text-3xl"
                containerClassName="menu-button"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MarketingHeader;
