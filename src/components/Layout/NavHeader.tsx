// components/Layout/NavHeader.tsx
'use client'
import React, { useState } from 'react';
import MobileNav from './MobileNav';
import Navbar from '@/components/Layout/Navbar';
/* 
  In the further applications I want to take header as the server. So I will take the client parts here, to manage resource control.
*/

const NavHeader: React.FC = () => {
  const [nav, setNav] = useState(false);
  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);


  return (
    <>
     <MobileNav nav={nav} closeNav={closeNav} />
     <Navbar openNav={openNav} />
    </>
  );
};

export default NavHeader;