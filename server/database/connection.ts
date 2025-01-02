import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL as string);

    return mongoose.connection.db;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectMongoDB;
