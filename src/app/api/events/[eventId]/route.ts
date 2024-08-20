import { connectToDatabase } from "@/dbConfig/dbConfig";
import Event, { IEvent } from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";
import logger from "@/lib/logger";

export async function GET(request: NextRequest, { params }: { params: { eventId: string } }) {
  try {
    const { eventId } = params;
    const locale = request.nextUrl.searchParams.get('locale') || 'en'; // Extract locale from query parameters or default to 'en'
    const dbName = "integreat"; // Correct database name
    const connection = await connectToDatabase(dbName);
    const eventModel = connection.model<IEvent>('Event', Event.schema, 'events');

    console.log(`Received request for event with ID: ${eventId}`);
    console.log(`Locale: ${locale}`);

    if (!eventId) {
      console.error('Event ID is undefined');
      return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
    }

    const event = await eventModel.findOne({ eventId }).exec();

    if (!event) {
      console.log(`No event found for ID: ${eventId}`);
      return NextResponse.json({ error: "No event found" }, { status: 404 });
    }

    console.log(`Event found: ${JSON.stringify(event)}`);
    return NextResponse.json({ event }, { status: 200 });
  } catch (error: any) {
    console.log(`Error processing request: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
