import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);

    return mongoose.connection.db;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectMongoDB;
