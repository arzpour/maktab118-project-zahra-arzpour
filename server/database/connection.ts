import mongoose from "mongoose";

await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL as string);

export const db = mongoose.connection.db;
