// Import necessary modules and middleware
const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

// Define a secret key for JSON Web Tokens
const JWT_SECRET = "Stay$healthy";

// ROUTE-1: Define a route for creating a new user using the POST method
router.post("/createuser", [
    // Validate the 'name' field to ensure it has a minimum length of 3 characters
    body("name", "Enter a valid name").isLength({ min: 3 }),
    // Validate the 'email' field to ensure it is a valid email address
    body("email", "Enter a valid email").isEmail(),
    // Validate the 'password' field to ensure it has a minimum length of 5 characters
    body("password", "Enter password at least 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    // Check for any validation errors
    const errors = validationResult(req);
    // If there are validation errors, return a 400 Bad Request response with an array of error messages
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check whether a user with the provided email already exists
        let user = await User.findOne({ email: req.body.email });
        // If a user with the same email exists, return a 400 Bad Request response with an error message
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" });
        }

        // Generate a salt for password hashing
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the generated salt
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user with the provided name, email, and password
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        // Create a data object to store the user's ID
        const data = {
            user: {
                id: user.id,
            },
        };

        // Generate a JSON Web Token using the data object and the secret key
        const authToken = jwt.sign(data, JWT_SECRET);
        // Return the newly created user with the generated authentication token
        res.json({ authToken });
    } catch (error) {
        // Log any internal server errors and return a 500 Internal Server Error response
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE-2: Define a route for logging in a user using the POST method
router.post("/login", [
    // Validate the 'email' field to ensure it is a valid email address
    body("email", "Enter a valid email").isEmail(),
    // Validate the 'password' field to ensure it exists
    body("password", "Password cannot be blank").exists(),
], async (req, res) => {
    // Check for any validation errors
    const errors = validationResult(req);
    // If there are validation errors, return a 400 Bad Request response with an array of error messages
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        // Check if a user with the provided email exists
        const user = await User.findOne({ email });
        // If no user is found, return a 400 Bad Request response with an error message
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        // Compare the provided password with the stored hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        // If the password does not match, return a 400 Bad Request response with an error message
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        // Create a data object to store the user's ID
        const data = {
            user: {
                id: user.id,
            },
        };

        // Generate a JSON Web Token using the data object and the secret key
        const authToken = jwt.sign(data, JWT_SECRET);
        // Return the authentication token
        res.json({ authToken });
    } catch (error) {
        // Log any internal server errors and return a 500 Internal Server Error response
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE-3: Define a route to get the logged-in user's details using the POST method
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        // Get the user ID from the request object set by the fetchuser middleware
        const userId = req.user.id;
        // Find the user by ID and exclude the password field from the result
        const user = await User.findById(userId).select("-password");
        // Return the user details
        res.send(user);
    } catch (error) {
        // Log any internal server errors and return a 500 Internal Server Error response
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Export the router module
module.exports = router;
