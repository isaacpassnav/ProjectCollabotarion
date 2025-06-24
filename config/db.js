const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
        })
        console.log("✅ Connected to MongoDB successfully");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    };
};
module.exports = connectDB