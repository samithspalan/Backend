import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error('MONGO_URL environment variable is not set');
        }
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("mongoose connected successfully");
    } catch (error) {
        console.error("mongoose connection failed:", error.message || error);
       
        process.exit(1);
    }
};