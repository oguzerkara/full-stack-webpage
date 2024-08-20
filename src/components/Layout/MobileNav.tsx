// /components/Layout/MobileNav.tsx
import { XMarkIcon } from "@heroicons/react/20/solid";
import React from 'react';
import { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import { useTranslations } from 'next-intl'; // Assuming you are using next-intl for translations



interface Props {
  nav: boolean;
  closeNav: () => void;
} 

const MobileNav = ({ nav, closeNav }: Props) => {
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

  const navAnimation = nav ? "translate-x-0" : "translate-x-[-100%]";
  return (
    <div className={`fixed ${navAnimation} mt-8 transform transition-all duration-300 top-20 left-0 right-0 bottom-0 z-[10000] bg-dark-grey-transparent9`}>
      <ul className="w-[100vw] h-[90vw] flex flex-col items-center justify-center  space-y-4">
        {Navlinks.map(({ LinkText, LinkTo }, index) => (
          <li key={index}>
            <NavLinks LinkText={LinkText} LinkTo={LinkTo} closeNav={() => { closeNav(); }}  LinkClassName="nav-link-mobile title" />
          </li>
        ))}
      </ul>
      <div
        onClick={() => { closeNav(); }}
        className="absolute flex justify-end cursor-pointer top-[6rem] right-[6rem] w-[4rem] h-[4rem] text-donau-blau"
      >
        <XMarkIcon className="w-full h-full hover:text-thd-blau" />
      </div>
    </div>
  );
}

export default MobileNav;