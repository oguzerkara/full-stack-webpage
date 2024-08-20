import mongoose, { Document, Schema, Model } from 'mongoose';

interface IEvent extends Document {
  _id: string;  // Explicitly set _id as a string to match what you want
  title: {
    en: string;
    de: string;
  };
  description: {
    en: string;
    de: string;
  };
  date: string;
  link?: string;
  contact: {
    en?: {
      email?: string;
      phone?: string;
      location?: string;
    };
    de?: {
      email?: string;
      phone?: string;
      location?: string;
    };
  };
  locations?: Array<{
    name: string;
    schedule: {
      en: string[];
      de: string[];
    };
  }>;
  last_updated: string;
  eventId: string;
}

const EventSchema: Schema = new Schema({
  _id: { type: String, required: true },  // Explicitly define _id as a String in your schema
  title: {
    en: { type: String, required: true },
    de: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    de: { type: String, required: true }
  },
  date: { type: String, required: true },
  link: { type: String },
  contact: { 
    type: new Schema({
      en: {
        email: { type: String },
        phone: { type: String },
        location: { type: String },
      },
      de: {
        email: { type: String },
        phone: { type: String },
        location: { type: String },
      },
    }, { _id: false }),
    required: true
  },
  locations: [{
    name: { type: String, required: true },
    schedule: {
      en: [{ type: String, required: true }],
      de: [{ type: String, required: true }]
    }
  }],
  last_updated: { type: String, required: true },
  eventId: { type: String, required: true }
});

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema, 'events');
export default Event;
export type { IEvent };
