const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create a new Mongoose schema for notes
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  // The title field is a string and is required
  title: {
    type: String,
    required: true
  },
  // The description field is a string and is required
  description: {
    type: String,
    required: true
  },
  // The tag field is a string and defaults to "General" if not provided
  tag: {
    type: String,
    default: "General"
  },
  // The date field is a Date and defaults to the current date and time
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a Mongoose model for the Notes schema
module.exports = mongoose.model("notes", NotesSchema);