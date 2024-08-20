// /page.tsx
import React from 'react';
import Button from '@/components/Button';
import Image from 'next/image'
import { useTranslations } from 'next-intl'; 


const HomePage = () => {
  const t = useTranslations('IndexPage');
// THERE IS VERSION 
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="hidden md:block mb-8 text-center w-full relative">
        <Image
          src={"/munchen/Munchen.jpg"}
          width={200} height={700}
          className="Munchen h-full w-full object-cover shadow-l"
          alt="München Marienplatz"
          sizes="(max-width: 768px) 80vw, (max-width: 800px) 50vw, 70vw" 
          />

            <div className="absolute bottom-32 left-28 text-left">
              <h2 className=" flex text-white lg:text-9xl text-5xl mb-2 shadow-l">{t('WelcomeHeader')}</h2>
              <Button
                LinkClassName="px-4 py-2 mb-4 bg-light-grey-transparent9 text-white"
                LinkTo="about"
                LinkText={t('GuideLink')}
              />
           </div>
           <h2 className="text-thd-blau font-bold">{t('City')}</h2>
        <p className="text">{t('Explanation')}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 p-4">
        <Button LinkClassName="flex justify-start items-end border cursor-pointer p-4 font-bold h-80 w-80" LinkTo="about" LinkText="Welcome to Our City Guide" />
        <Button LinkClassName="flex justify-start items-end border cursor-pointer p-4 font-bold h-80 w-80" LinkTo="about" LinkText="Welcome to Our City Guide" />
        <Button LinkClassName="flex justify-start items-end border cursor-pointer p-4 font-bold h-80 w-80" LinkTo="about" LinkText="Welcome to Our City Guide" />
        <Button LinkClassName="flex justify-start items-end border cursor-pointer p-4 font-bold h-80 w-80" LinkTo="about" LinkText="Welcome to Our City Guide" />
        <Button LinkClassName="flex justify-start items-end border cursor-pointer p-4 font-bold h-80 w-80" LinkTo="about" LinkText="Welcome to Our City Guide" />
      </div>
    </section>
  );
};

export default HomePage;