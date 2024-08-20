// /src/components/Layout/Navbar.tsx
import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import Link from "next/link";
import { useTranslations } from 'next-intl';

interface Props {
  openNav: () => void;
}

const Navbar = ({ openNav }: Props) => {
  const t = useTranslations('Navigation');
  const [isUserActive, setIsUserActive] = useState(false);

  useEffect(() => {
    async function checkUserActive() {
      try {
        const response = await fetch('/api/navbar');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setIsUserActive(data.isActive);
      } catch (error) {
        console.error("Failed to fetch user active status:", error);
      }
    }

    checkUserActive();
  }, []);

  const navKeys = ['Home', 'News', 'Error', 'LegalService', 'Emergency', 'Map'];

  if (isUserActive) {
    navKeys.unshift('Events');
  }
  console.log(navKeys)

  const Navlinks = navKeys.map((key) => ({
    LinkText: t(key),
    LinkTo: t(`Links.${key}`)
  }));

  return (
    <div className="fixed flex w-full top-12 h-11 py-6 bg-light-grey-transparent8 shadow-xl text-white text-justify">
      <div className="flex items-center space-x-1 ml-7">
        <Link href='/' className="cursor-pointer">
          <Image 
            src="/THD-Logo.png"
            width="0"
            height="0"
            sizes="100vw"
            className="h-[32px] w-auto shadow-l"
            alt="Technische Hochschule Deggendorf Logo"
          />
        </Link>
      </div>
      <ul className="flex items-center justify-between w-[65%] mx-auto h-[100%]">
        {Navlinks.map(({ LinkText, LinkTo }, index) => (
          <li key={index} className="nav-link md:inline-block hidden">
            <Link href={LinkTo} className="nav-link-mobile">
              {LinkText}
            </Link>
          </li>
        ))}
        <div className="flex grow items-center justify-end md:hidden">
          <span onClick={openNav} className="text-white font-bold items-center">Open Menu</span>
          <Bars3Icon onClick={openNav} className="w-[2rem] h-[2rem] cursor-pointer font-bold text-dark-grey hover:text-donau-blau" />
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
