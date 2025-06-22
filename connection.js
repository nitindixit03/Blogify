const mongoose = require('mongoose');

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("✅ MongoDB is successfully connected!!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
    }
};

module.exports = db;
