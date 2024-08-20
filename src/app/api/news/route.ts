// /api/news/route.tsx
// SAVED
import { connectToDatabase } from "@/dbConfig/dbConfig";
import News from "@/models/newsModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const dbName = "integreat"; // Correct database name
    const connection = await connectToDatabase(dbName);
    const newsModel = connection.model('News', News.schema, 'test');

    const { title, body } = await request.json();
    await newsModel.create({ title, body });
    return NextResponse.json({ message: "News Created" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const dbName = "integreat"; // Correct database name
    const connection = await connectToDatabase(dbName);
    const newsModel = connection.model('News', News.schema, 'test');

    const news = await newsModel.find();
    return NextResponse.json({ news });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const dbName = "integreat"; // Correct database name
    const connection = await connectToDatabase(dbName);
    const newsModel = connection.model('News', News.schema, 'test');

    const newsID = request.nextUrl.searchParams.get("id");
    await newsModel.findByIdAndDelete(newsID);
    return NextResponse.json({ message: "News Deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
