import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      return console.log(
        "No mongodb connection url found in your env variable, please create one and try again!"
      );
    }

    const conn = await mongoose.connect(process.env.MONGO_URL);
    conn & console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
