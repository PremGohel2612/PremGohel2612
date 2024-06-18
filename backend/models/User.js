const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the UserSchema with fields for name, email, password, and date
const UserSchema = new Schema({
    // The name field is a string and is required
    name: {
        type: String,
        required: true
    },
    // The email field is a string, is required, and must be unique
    email: {
        type: String,
        required: true,
        unique: true
    },
    // The password field is a string and is required
    password: {
        type: String,
        required: true
    },
    // The date field is a Date and defaults to the current date and time
    date: {
        type: Date,
        default: Date.now
    }
});

// Create a Mongoose model for the User schema
const User = mongoose.model("user", UserSchema);

// Export the User model
module.exports = User;