import mongoose from "mongoose";


const connectMongoDB = async () => {
  const mongodbUrl = process.env.NEXT_PUBLIC_MONGODB_URL;
  if (!mongodbUrl) {
    throw new Error("MongoDB URL is not defined");
  }
  await mongoose.connect(mongodbUrl);
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL as string);

    return mongoose.connection.db;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectMongoDB;
    return mongoose.connection.db;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default connectMongoDB;
