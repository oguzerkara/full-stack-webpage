// /components/Layout/Profile.tsx
'use client';
import { UserIcon }  from "@heroicons/react/24/solid";
import React, { useState } from 'react';
import Link from 'next/link';

const ProfileIcon: React.FC = () => {
  let [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    
  };

  return (
    <>
      <div className="w-[1.5rem] h-[1.5rem] cursor-pointer font-bold text-thd-blau hover:text-donau-blau"> 
      
        <Link href={'/profile'}><UserIcon onClick={toggleVisibility} className='cursor-pointer font-bold text-thd-blau hover:text-donau-blau'/></Link>

      </div>
    </>
  );
};

export default ProfileIcon;