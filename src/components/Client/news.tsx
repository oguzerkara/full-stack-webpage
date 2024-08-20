// /Client/news.tsx

// SAVED
import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface NewsType {
  userId: string;
  id: string;
  title: string;
  body: string;
}

const limitWords = (text: string, wordLimit: number): string => {
  const words = text.split(' ');
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(' ') + '...';
};

const NewsPage: React.FC<NewsType> = ({ userId, id, title, body }) => {
  const limitedBody = limitWords(body, 10); // Limit body to 20 words
  const t = useTranslations('NewsPage');

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 w-full max-w h-40">
      <div className="title text-thd-blau font-bold mb-2">{id} - {title}</div>
      
      <div className="text-dark-grey mb-4"> <span className='font-bold'> {t('Description')} </span>{limitedBody}</div>
      <Link href={`/news/${id}`}
       className="text-the-blau hover:text-donau-blau transition-colors duration-200">
          {t('viewDetails')}
      </Link>
    </div>
  );
};

export default NewsPage;
