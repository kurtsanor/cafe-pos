import mongoose from "mongoose";

let isConnected = false;

async function getConnection(): Promise<void> {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined in .env");

  try {
    await mongoose.connect(uri, {
      autoIndex: true,
      dbName: "cafe_pos",
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });

    isConnected = true;
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

export default getConnection;
