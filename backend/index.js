const connectToMongo = require("./db");
const express = require('express');

// Establish a connection to the MongoDB database
connectToMongo();

// Create an instance of the Express.js framework
const app = express();

// Define the port number for the application
const port = 5000;

// Enable JSON parsing for request bodies
app.use(express.json());

// Define routes for authentication and notes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message to the console when the server is listening
  console.log(`Example app listening on port ${port}`);
});