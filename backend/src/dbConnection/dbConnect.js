import mongoose from "mongoose";

export async function connectMongoDB(dbURL) {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to mongoDB.");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}
