"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

const TransitionLink = ({
  href,
  children,
  ...props
}: ComponentProps<typeof Link>) => {
  const router = useRouter();

  const handleNavigation = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    // e.preventDefault();
  };

  return (
    <Link href={href} {...props} onClick={handleNavigation}>
      {children}
    </Link>
  );
};

export default TransitionLink;
