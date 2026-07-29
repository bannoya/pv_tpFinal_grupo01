const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error(
    "MONGODB_URI is required. Copy .env.example to .env and provide a rotated MongoDB credential."
  );
}

mongoose.connect(mongoUri);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

connection.on("error", (error) => {
  console.error("MongoDB connection error:", error.message);
});

module.exports = connection;
