import mongoose from "mongoose";


const connectDB = async () => {
  console.log(process.env.MONGO);
  try {
    const conn = await mongoose.connect(process.env.MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectDB;
