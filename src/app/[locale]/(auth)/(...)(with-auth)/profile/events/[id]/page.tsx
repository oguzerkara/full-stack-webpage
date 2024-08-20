// /events/[id]/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

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
  contact: string | { email: string; phone: string };
}
export const dynamic = 'force-dynamic';

const getEventById = async (id: string, locale: string): Promise<EventType | null> => {
  try {
    const res = await fetch(`/api/events/${id}?locale=${locale}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch event details for ID: ${id}`);
      throw new Error('Failed to fetch event details');
    }

    const data = await res.json();
    return {
      ...data.event,
      id: data.event._id,
    };
  } catch (error: any) {
    console.error('Error fetching event details:', error);
    return null;
  }
};

const editEventById = async (id: string, locale: string, event: EventType) => {
  try {
    const res = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!res.ok) {
      console.error(`Failed to update event for ID: ${id}`);
      throw new Error('Failed to update event');
    }

    return await res.json();
  } catch (error: any) {
    console.error('Error updating event details:', error);
    return null;
  }
};

const deleteEventById = async (id: string) => {
  try {
    const res = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.error(`Failed to delete event for ID: ${id}`);
      throw new Error('Failed to delete event');
    }

    return true;
  } catch (error: any) {
    console.error('Error deleting event:', error);
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

interface EventPageProps {
  params: { id: string; locale: string };
}

const EventPageWrapper: React.FC<{ event: EventType; locale: string; isAdmin: boolean }> = ({ event, locale, isAdmin }) => {
  const t = useTranslations('EventsPage');
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(event);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm(t('ConfirmDelete'))) {
      const deleted = await deleteEventById(event.id);
      if (deleted) {
        window.location.href = '/events';
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name.includes('title') ? 'title' : 'description']: {
        ...prevEvent[name.includes('title') ? 'title' : 'description'],
        [locale]: value,
      },
    }));
  };

  const handleSaveClick = async () => {
    if (editedEvent) {
      await editEventById(editedEvent.id, locale, editedEvent);
      setIsEditing(false);
    }
  };

  if (!event) {
    return <div>{t('ErrorLoading')}</div>;
  }

  return (
    <div className="grid place-items-center bg-white mt-20 lg:h-screen h-full lg:px-32 px-4 py-8">
      <div className="flex flex-col rounded py-16 px-6 md:px-16 justify-center items-start w-full gap-6 max-w-screen-2xl shadow-md">
        <div className="w-full flex justify-between items-center mb-2">
          <div className="text-thd-blau font-bold">
            {t('Id')}: {event.id}
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
                  <span className="font-bold">{t('Title')}:</span>
                  <input
                    type="text"
                    name="title"
                    value={editedEvent.title[locale as 'en' | 'de']}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </label>
              </div>
              <div>
                <label>
                  <span className="font-bold">{t('Description')}:</span>
                  <textarea
                    name="description"
                    value={editedEvent.description[locale as 'en' | 'de']}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </label>
              </div>
              <div>
                <label>
                  <span className="font-bold">{t('Date')}:</span>
                  <input
                    type="text"
                    name="date"
                    value={editedEvent.date}
                    onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                  />
                </label>
              </div>
              <div>
                <label>
                  <span className="font-bold">{t('Link')}:</span>
                  <input
                    type="text"
                    name="link"
                    value={editedEvent.link}
                    onChange={(e) => setEditedEvent({ ...editedEvent, link: e.target.value })}
                    className="border border-gray-300 p-2 rounded"
                  />
                </label>
              </div>
              <div>
                <label>
                  <span className="font-bold">{t('Contact')}:</span>
                  <input
                    type="text"
                    name="contact"
                    value={typeof editedEvent.contact === 'string' ? editedEvent.contact : `${editedEvent.contact.email} | ${editedEvent.contact.phone}`}
                    onChange={(e) => setEditedEvent({ ...editedEvent, contact: e.target.value })}
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
              <div><span className="font-bold">{t('Title')}:</span> {event.title[locale as 'en' | 'de']}</div>
              <div><span className="font-bold">{t('Description')}:</span> {event.description[locale as 'en' | 'de']}</div>
              <div><span className="font-bold">{t('Date')}:</span> {event.date}</div>
              <div><span className="font-bold">{t('Link')}:</span> <a href={event.link} className="text-blue-600 hover:text-blue-800 transition-colors duration-200">{event.link}</a></div>
              <div><span className="font-bold">{t('Contact')}:</span> {typeof event.contact === 'string' ? event.contact : `${event.contact.email} | ${event.contact.phone}`}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EventPage: React.FC<EventPageProps> = ({ params }) => {
  const { id, locale } = params;
  const [event, setEvent] = useState<EventType | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventAndAdminDetails = async () => {
      try {
        const [eventData, adminInfo] = await Promise.all([
          getEventById(id, locale),
          getAdminDetails(),
        ]);
        setEvent(eventData);
        setIsAdmin(adminInfo);
      } catch (error) {
        console.error('Error fetching event and admin details:', error);
      }
    };

    fetchEventAndAdminDetails();
  }, [id, locale]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return <EventPageWrapper event={event} locale={locale} isAdmin={isAdmin} />;
};

export default EventPage;
