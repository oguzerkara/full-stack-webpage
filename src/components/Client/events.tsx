"use client"
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  link: string;
  contact: any;
  last_updated: string;
}

const limitWords = (text: string, wordLimit: number): string => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const EventsPage: React.FC<EventType> = ({ id, title, description, date, link, contact, last_updated }) => {
  const limitedDescription = limitWords(description, 20); // Limit description to 20 words
  const t = useTranslations('NewsPage');

  console.log('Rendering event with id:', id); // Log id to ensure it's being received

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="title text-thd-blau font-bold mb-2">{id} - {title}</div>
      <div className="text-dark-grey mb-4"><span className='font-bold'> {t('Description')} </span>{limitedDescription} <span className='text-light-grey-transparent7'>{t('readMore')}</span></div>
      <div className="text-dark-grey mb-4"><span className='font-bold'> {t('Date')} </span>{date}</div>
      <Link href={`/profile/events/${id}`}
        className="text-the-blau hover:text-donau-blau transition-colors duration-200" >
          {t('viewDetails')}
      </Link>
    </div>
  );
};

export default EventsPage;
