// /app/[locale]/layout.tsx
import './globals.css';
import React from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: {
    absolute: '',
    default: 'Integreat | Web-App | Local Information for You',
    template: '%s | Integreat',
  },
  description: 'Integreat | Web-App | Local Information for You',
  icons: '/icon.ico',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  // Set the locale for static rendering
  unstable_setRequestLocale(locale);

  // Fetch messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className="html body">
      <body className="prose lg:prose-xl">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <div className="mt-16">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
