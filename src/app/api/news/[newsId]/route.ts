// /api/news/[newsId]/route.ts
import { connectToDatabase } from "@/dbConfig/dbConfig";
import News from "@/models/newsModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { newsId: string } }) {
  try {
    const { newsId } = params;
    const locale = request.nextUrl.searchParams.get('locale') || 'en'; // Extract locale from query parameters or default to 'en'
    const dbName = "integreat";
    const connection = await connectToDatabase(dbName);
    const newsModel = connection.model('News', News.schema, 'test');

    const news = await newsModel.findById(newsId).exec();
    
    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }
    return NextResponse.json({ news }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { newsId: string } }) {
  try {
    const { newsId } = params;
    const updatedNewsData = await request.json();
    const dbName = "integreat";
    const connection = await connectToDatabase(dbName);
    const newsModel = connection.model('News', News.schema, 'test');

    const updatedNews = await newsModel.findByIdAndUpdate(newsId, updatedNewsData, { new: true }).exec();
    
    if (!updatedNews) {
      return NextResponse.json({ error: "Failed to update news" }, { status: 404 });
    }
    return NextResponse.json({ news: updatedNews }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { newsId: string } }) {
  try {
    const { newsId } = params;
    const dbName = "integreat";
    const connection = await connectToDatabase(dbName);
    const newsModel = connection.model('News', News.schema, 'test');

    const deletedNews = await newsModel.findByIdAndDelete(newsId).exec();
    
    if (!deletedNews) {
      return NextResponse.json({ error: "Failed to delete news" }, { status: 404 });
    }
    return NextResponse.json({ message: "News deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
