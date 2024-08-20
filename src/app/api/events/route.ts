import { connectToDatabase } from "@/dbConfig/dbConfig";
import Event, { IEvent } from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Received request for all events");

  try {
    const dbName = "integreat";
    const connection = await connectToDatabase(dbName);
    const eventModel = connection.model<IEvent>('Event', Event.schema, 'events');

    const events = await eventModel.find();

    if (!events || events.length === 0) {
      console.log("No events found");
      return NextResponse.json({ error: "No events found" }, { status: 404 });
    }

    console.log("Events retrieved successfully");

    return NextResponse.json({ events }, { status: 200 });
  } catch (error: any) {
    console.log("Error retrieving events");
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
