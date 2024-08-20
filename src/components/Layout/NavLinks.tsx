// /components/Layout/NavLinks.tsx
'use client'
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface Props {
  LinkText?: string;
  LinkTo: string;
  LinkClassName?: string;
  closeNav?: () => void;

}
function NavLinks({ LinkText, LinkTo, LinkClassName, closeNav }:Props){
  const isCloseNav = () => {
    if (typeof closeNav === 'function') {
      closeNav();
    }
  };
  const pathname = usePathname();
  const isActive = (LinkTo === "/" && pathname === "/") || (LinkTo !== "/" && pathname.startsWith(LinkTo) && !pathname.startsWith("/..."));
  return (
    <Link className={isActive ? "text-donau-blau" : LinkClassName } href={LinkTo} onClick={isCloseNav}
      >{LinkText}
    </Link>
    );
};

export default NavLinks