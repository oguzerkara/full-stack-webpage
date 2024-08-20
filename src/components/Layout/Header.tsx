// /components/Header.tsx
import React, {useEffect, FC} from 'react';
import NavHeader from './NavHeader';
import LanguageBar from './Languagebar';
import ProfileIcon from './Profile';
import { useTranslations } from 'next-intl'; 

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const t = useTranslations('Navigation');

  return (
    <header className="fixed top-0 left-0 right-0 flex flex-col items-center shadow-xl bg-light-grey-transparent1 z-50">      
      <div className='flex flex-row justify-center'>
        <div className=" w-[full] flex justify-center mt-4 bg-white rounded-tl-[80%] rounded-tr-[80%] ">
          <div className=" bg-light-grey-transparent1 px-12 py-0.5 rounded-tl-[80%] rounded-tr-[80%]">
              <span className="md:text-xl font-bold text-sm">{t('CityName')}</span>
          </div>
        </div>
        <div className=' absolute right-10 bottom-1 flex space-x-4 cursor-pointer'>
          <LanguageBar /> 
          <ProfileIcon />
        </div>
        <NavHeader />
      </div>
    </header>
  );
};

export default Header;