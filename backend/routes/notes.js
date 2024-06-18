// Import necessary modules and middleware
const express = require("express");
const fetchuser = require("../middleware/fetchuser"); // Middleware to authenticate user
const router = express.Router();
const Note = require("../models/Note"); // Note model
const { body, validationResult } = require('express-validator'); // Express-validator for validation

// ROUTE-1: Define a route to fetch all notes for the logged-in user using the GET method
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        // Find all notes that belong to the authenticated user
        const notes = await Note.find({ user: req.user.id });
        // Return the notes as a JSON response
        res.json(notes);
    } catch (error) {
        // Log any internal server errors and return a 500 Internal Server Error response
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE-2: Define a route to add a new note using the POST method
router.post("/addnote", fetchuser, [
    // Validate the 'title' field to ensure it has a minimum length of 3 characters
    body("title", "Enter a valid title").isLength({ min: 3 }),
    // Validate the 'description' field to ensure it has a minimum length of 5 characters
    body("description", "Enter a valid description").isLength({ min: 5 }),
], async (req, res) => {
    try {
        // Destructure the required fields from the request body
        const { title, description, tag } = req.body;

        // Check for any validation errors
        const errors = validationResult(req);
        // If there are validation errors, return a 400 Bad Request response with an array of error messages
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a new note with the provided title, description, tag, and user ID
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });
        // Save the note to the database
        const savedNote = await note.save();

        // Return the saved note as a JSON response
        res.json(savedNote);
    } catch (error) {
        // Log any internal server errors and return a 500 Internal Server Error response
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE-3: Define a route to update an existing note using the PUT method
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object with the updated fields
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow update only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Update the note with new data
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        // Return the updated note as a JSON response
        res.json({ note });
    } catch (error) {
        // Log any internal server errors and return a 500 Internal Server Error response
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE-4: Define a route to delete an existing note using the DELETE method
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Delete the note from the database
        note = await Note.findByIdAndDelete(req.params.id);
        // Return a success message along with the deleted note as a JSON response
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        // Log any internal server errors and return a 500 Internal Server Error response
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Export the router module
module.exports = router;
