import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URL as string);
    }
    console.log("DB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    throw error;
  }
};

