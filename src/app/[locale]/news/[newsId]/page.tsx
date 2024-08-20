"use client";
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

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
export const dynamic = 'force-dynamic';

const getNewsById = async (id: string, locale: string): Promise<NewsType | null> => {
  try {
    const res = await fetch(`/api/news/${id}?locale=${locale}`, {
      method: 'GET',
      cache: 'no-store', // Ensures fresh data on every request
    });

    if (!res.ok) {
      console.error(`Failed to fetch news details for ID: ${id}`);
      throw new Error('Failed to fetch news details');
    }

    const data = await res.json();
    return {
      ...data.news,
      id: data.news._id, // Assuming _id should be mapped to id
    };
  } catch (error: any) {
    console.error('Error fetching news details:', error);
    return null;
  }
};

const editNewsById = async (id: string, locale: string, news: NewsType) => {
  try {
    const res = await fetch(`/api/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(news),
    });

    if (!res.ok) {
      console.error(`Failed to update news for ID: ${id}`);
      throw new Error('Failed to update news');
    }

    return await res.json();
  } catch (error: any) {
    console.error('Error updating news details:', error);
    return null;
  }
};

const deleteNewsById = async (id: string) => {
  try {
    const res = await fetch(`/api/news/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.error(`Failed to delete news for ID: ${id}`);
      throw new Error('Failed to delete news');
    }

    return true;
  } catch (error: any) {
    console.error('Error deleting news:', error);
    return false;
  }
};

const getAdminDetails = async () => {
  try {
    const response = await fetch('/api/users/theAdmin', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const info = await response.json();
    return info.isAdmin;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return false;
  }
};

interface NewsPageProps {
  params: { newsId: string; locale: string };
}

const NewsPageWrapper: React.FC<{ news: NewsType; locale: string; isAdmin: boolean }> = ({ news, locale, isAdmin }) => {
  const t = useTranslations('NewsPage');
  const [isEditing, setIsEditing] = useState(false);
  const [editedNews, setEditedNews] = useState(news);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm(t('ConfirmDelete'))) {
      const deleted = await deleteNewsById(news.id);
      if (deleted) {
        window.location.href = '/news';
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedNews((prevNews) => ({
      ...prevNews,
      [name.includes('title') ? 'title' : 'body']: {
        ...prevNews[name.includes('title') ? 'title' : 'body'],
        [locale]: value,
      },
    }));
  };

  const handleSaveClick = async () => {
    if (editedNews) {
      await editNewsById(editedNews.id, locale, editedNews);
      setIsEditing(false);
    }
  };

  if (!news) {
    return <div>{t('ErrorLoading')}</div>;
  }

  return (
    <div className="grid place-items-center bg-white mt-20 lg:h-screen h-full lg:px-32 px-4 py-8">
      <div className="flex flex-col rounded py-16 px-6 md:px-16 justify-center items-start w-full gap-6 max-w-screen-2xl shadow-md">
        <div className="w-full flex justify-between items-center mb-2">
          <div className="text-thd-blau font-bold">
            {t('Id')}: {news.id}
          </div>
          {isAdmin && (
            <div className="flex space-x-2 text-thd-blau cursor-pointer">
              {!isEditing && (
                <div className="hover:text-donau-blau" onClick={handleEditClick}>
                  <FaEdit />
                </div>
              )}
              <div className="hover:text-donau-blau" onClick={handleDeleteClick}>
                <MdDelete />
              </div>
            </div>
          )}
        </div>
        <div>
          {isEditing ? (
            <div>
              <div>
                <label>
                  <span className="font-bold">{t('News')}: </span>
                  <input
                    type="text"
                    name="title"
                    value={editedNews.title[locale as 'en' | 'de']}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </label>
              </div>
              <div>
                <label>
                  <span className="font-bold">{t('Description')}: </span>
                  <textarea
                    name="body"
                    value={editedNews.body[locale as 'en' | 'de']}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </label>
              </div>
              <button onClick={handleSaveClick} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                {t('Save')}
              </button>
            </div>
          ) : (
            <div>
              <div>
                <span className="font-bold"> {t('News')}: </span>
                {news.title[locale as 'en' | 'de']}
              </div>
              <div>
                <span className="font-bold"> {t('Description')}: </span>
                {news.body[locale as 'en' | 'de']}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NewsPage: React.FC<NewsPageProps> = ({ params }) => {
  const { newsId, locale } = params;
  const [news, setNews] = useState<NewsType | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchNewsAndAdminDetails = async () => {
      try {
        const [newsData, adminInfo] = await Promise.all([
          getNewsById(newsId, locale),
          getAdminDetails(),
        ]);
        setNews(newsData);
        setIsAdmin(adminInfo);
      } catch (error) {
        console.error('Error fetching news and admin details:', error);
      }
    };

    fetchNewsAndAdminDetails();
  }, [newsId, locale]);

  if (!news) {
    return <div>Loading...</div>;
  }

  return <NewsPageWrapper news={news} locale={locale} isAdmin={isAdmin} />;
};

export default NewsPage;
