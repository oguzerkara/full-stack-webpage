// /components/IntlProviderWrapper.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';

interface IntlProviderWrapperProps {
  locale: string;
  children: React.ReactNode;
}

export default function IntlProviderWrapper({ locale, children }: IntlProviderWrapperProps) {
  const [messages, setMessages] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await fetch(`/api/messages?locale=${locale}`);
        const messagesData = await res.json();
        setMessages(messagesData);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    }
    loadMessages();
  }, [locale]);

  if (!messages) {
    return <div>Loading...</div>; // You can add a loader here
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
