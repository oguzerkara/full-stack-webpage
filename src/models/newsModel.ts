// models/newsModel.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

interface INews extends Document {
  _id: string;
  userId: string;
  title: {
    en: string;
    de: string;
  };
  body: {
    en: string;
    de: string;
  };
}

const NewsSchema: Schema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  title: {
    en: { type: String, required: true },
    de: { type: String, required: true },
  },
  body: {
    en: { type: String, required: true },
    de: { type: String, required: true },
  },
});

const News: Model<INews> = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

export default News;
export type { INews };
