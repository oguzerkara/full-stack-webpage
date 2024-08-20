// /helpers/getTranslations.ts
import { connectToDatabase } from '@/dbConfig/dbConfig';

async function getTranslations(locale: string) {
  console.log(`Fetching translations for locale: ${locale}`);
  const dbName = 'messages';
  const connection = await connectToDatabase(dbName);
  const collection = connection.collection(locale);

  console.log(`Connected to collection: ${locale}`);
  const translations = await collection.findOne({});
  console.log(`Translations found: ${JSON.stringify(translations)}`);

  if (!translations) {
    throw new Error(`Translations for locale "${locale}" not found`);
  }

  return translations.messages;
}

export default getTranslations;
