// /dbConfig/dbConfig.ts
import mongoose from "mongoose";

export async function connectToDatabase(dbName: string) {
  try {
    // Construct the URI dynamically to include the database name
    const uri = process.env.MONGO_URI!.replace('<dbname>', dbName);
    const connection = await mongoose.createConnection(uri);

    connection.on('connected', () => {
      console.log(`MongoDB connected successfully to database: ${dbName}`);
    });

    connection.on('error', (err) => {
      console.log(`MongoDB connection error. Please make sure MongoDB is running: ${err}`);
      process.exit();
    });

    return connection;
  } catch (error) {
    console.log('Something went wrong!');
    console.log(error);
    throw error;
  }
}
