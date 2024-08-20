// /app/news/page.tsx
import React from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import NewsPage from '@/components/Client/news';

interface NewsType {
  userId: string;
  id: string;
  title: {
    en: string;
    de: string;
  };
  body: {
    en: string;
    de: string;
  };
}

const getTestNews = async (): Promise<NewsType[]> => {
  try {
    const res = await fetch(`${process.env.DOMAIN}/api/news`, {
      method: 'GET',
      cache: 'no-store', // No caching to ensure fresh data
    });

    if (!res.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await res.json();
    if (!Array.isArray(data.news)) {
      throw new Error('Invalid news data format');
    }

    return data.news.map((item: any) => ({
      ...item,
      id: item._id, // Mapping _id to id
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

interface NewsPageProps {
  params: { locale: string };
}

const News = async ({ params }: NewsPageProps) => {
  await unstable_setRequestLocale(params.locale); // Setting the locale for the request
  const news = await getTestNews();

  return <NewsPageWrapper news={news} locale={params.locale} />;
};

interface NewsPageWrapperProps {
  news: NewsType[];
  locale: string;
}

const NewsPageWrapper: React.FC<NewsPageWrapperProps> = ({ news, locale }) => {
  const t = useTranslations('NewsPage');

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow grid place-items-center bg-white mt-20 lg:px-32 px-4 py-8">
        <h2 className="flex items-center justify-center text-thd-blau">{t('News')}</h2>
        <div className="flex flex-col rounded py-16 px-6 md:px-16 justify-center items-start w-full gap-6 max-w-screen-2xl shadow-md">
          {news.length === 0 ? (
            <h2>{t('NoNews')}</h2>
          ) : (
            news.map((newsItem: NewsType) => (
              <NewsPage
                key={newsItem.id}
                id={newsItem.id}
                userId={newsItem.userId}
                title={newsItem.title[locale as 'en' | 'de']}
                body={newsItem.body[locale as 'en' | 'de']}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
