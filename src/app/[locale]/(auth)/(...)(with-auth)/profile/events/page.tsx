"use client";

import React, { useState, useEffect } from 'react';
import EventsPage from '@/components/Client/events';
import { useTranslations } from 'next-intl';

interface EventType {
  id: string;
  title: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  date: string;
  link: string;
  contact: any;
  last_updated: string;
}

const Events: React.FC<{ params: { locale: string } }> = ({ params }) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('EventsPage');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/events`, {
          method: 'GET',
          cache: 'no-store',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await res.json();
        if (!Array.isArray(data.events)) {
          throw new Error('Invalid events data format');
        }

        setEvents(
          data.events.map((item: any) => ({
            ...item,
            id: item.eventId, // Mapping eventId to id
          }))
        );
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>{t('Loading')}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow grid place-items-center bg-white mt-20 lg:px-32 px-4 py-8">
        <h2 className="flex items-center justify-center text-thd-blau">{t('Events')}</h2>
        <div className="flex flex-col rounded py-16 px-6 md:px-16 justify-center items-start w-full gap-6 max-w-screen-2xl shadow-md">
          {events.length === 0 ? (
            <p>{t('NoEvents')}</p>
          ) : (
            events.map((event) => (
              <EventsPage
                key={event.id}
                id={event.id}
                title={event.title[params.locale as 'en' | 'de']}
                description={event.description[params.locale as 'en' | 'de']}
                date={event.date}
                link={event.link}
                contact={event.contact}
                last_updated={event.last_updated}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
