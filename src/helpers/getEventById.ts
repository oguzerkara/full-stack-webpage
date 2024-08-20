// /helpers/getEventById.ts
import { cache } from 'react';

const getEventById = cache(async (id: string): Promise<any | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`, {
      method: 'GET',
      // Use cache and revalidate as per Next.js best practices
      next: { revalidate: 60 }, // Revalidate data every 60 seconds
    });

    if (!res.ok) {
      console.error(`Failed to fetch event details for ID: ${id}`);
      return null;
    }

    const data = await res.json();
    return data.event;
  } catch (error: any) {
    console.error('Error fetching event details:', error);
    return null;
  }
});

export default getEventById;
