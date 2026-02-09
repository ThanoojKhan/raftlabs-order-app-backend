const mongoose = require("mongoose");
const ENV = require("./env");

const MONGODB_URI = ENV.MONGODB_URI;

exports.connectMongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 10,
            autoIndex: false,
        });

        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        throw err;
    }
};

exports.disconnectMongoDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
    } catch (err) {
        console.error("MongoDB disconnect failed:", err.message);
    }
};