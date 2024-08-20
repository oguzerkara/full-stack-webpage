import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { connectToDatabase } from './dbConfig/dbConfig';
import mongoose from 'mongoose';

const locales = ['en', 'de'];

const getMessagesFromDB = async (locale: string) => {
  const dbName = "integreat";
  const connection = await connectToDatabase(dbName);

  const schema = new mongoose.Schema({}, { strict: false });
  const Model = connection.model('Messages', schema, locale);

  const document = await Model.findOne({}).lean().exec();
  if (!document) {
    throw new Error(`No messages found for locale: ${locale}`);
  }

  const { _id, ...messages } = document;
  return messages;
};

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessagesFromDB(locale);

  return {
    messages,
  };
});
