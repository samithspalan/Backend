import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/synergia';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            // use new url parser / unified topology are defaults in mongoose v6+
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

export default connectDB;