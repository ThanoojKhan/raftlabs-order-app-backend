require("dotenv").config({ path: ".env.test" });
const mongoose = require("mongoose");
const { connectMongoDB, disconnectMongoDB } = require("../config/mongodb");

beforeAll(async () => {
    await connectMongoDB();
});

afterAll(async () => {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        await collections[key].deleteMany();
    }

    await disconnectMongoDB();
});