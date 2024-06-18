const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook"; // Replace 'myDatabase' with your actual database name

// Establish a connection to the MongoDB database
const connectToMongo = async () => {
  try {
    // Attempt to connect to the MongoDB database
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    // Log an error message if the connection attempt fails
    console.error("Failed to connect to MongoDB", err);
  }
}

// Export the connectToMongo function
module.exports = connectToMongo;