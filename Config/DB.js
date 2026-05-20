const mongoose = require("mongoose");
require("dotenv").config();

async function DBConnect() {
    try {
        const mongoURL = process.env.MongoDB;

        await mongoose.connect(mongoURL);

        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error(
            error instanceof Error ? error.message : "Something went wrong.",
        );

        process.exit(1);
    }
}

module.exports = DBConnect;
