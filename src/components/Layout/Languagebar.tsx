// /components/Layout/Languagebar.tsx
'use client';
import { GlobeAltIcon }  from "@heroicons/react/24/solid";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LanguageBar: React.FC = () => {
  let [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleLanguageChange = (path: string) => {
    return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      router.push(path);
      router.refresh(); // This will reload the page in Next.js 14
    };
  };
  return (
    <>
      <div className=""> 
      <p onClick={toggleVisibility} className='cursor-pointer font-bold text-thd-blau hover:text-donau-blau'
      > DE | EN </p>
      </div>
      {isVisible && (
        <div className="fixed top-24 left-0 right-4 bg-white shadow-md p-2 flex justify-center scroll-smooth">
          <ul className="flex space-x-4">
            <Link href="/en" onClick={handleLanguageChange('/en')} className="text-thd-blau hover:text-donau-blau">English </Link>
            <Link href="/de" onClick={handleLanguageChange('/de')} className="text-thd-blau hover:text-donau-blau">Deutsch </Link>
            <Link href="/fr" onClick={handleLanguageChange('/fr')} className="text-thd-blau hover:text-donau-blau">Français </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default LanguageBar;