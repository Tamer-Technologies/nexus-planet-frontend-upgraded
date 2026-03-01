"use client";

import { usePageTransition } from "@/contexts/PageTransitionContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps } from "react";

const TransitionLink = ({
  href,
  children,
  ...props
}: ComponentProps<typeof Link>) => {
  const router = useRouter();
  const tl = usePageTransition();
  const pathname = usePathname();

  const handleNavigation = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (href === pathname.toString()) return;
    if (tl?.current) await tl.current.play();
    router.push(`${href}`);
  };

  return (
    <Link href={href} {...props} onClick={handleNavigation}>
      {children}
    </Link>
  );
};

export default TransitionLink;
