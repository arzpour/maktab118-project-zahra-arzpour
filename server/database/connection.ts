import mongoose from "mongoose";

export const connectToDatabase = async () => {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL as string);
  return mongoose.connection.db;
};

export const db = connectToDatabase();
