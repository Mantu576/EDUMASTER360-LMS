// controllers/note-controller.js
const Note = require('../models/noteSchema');
const path = require('path');
const fs = require('fs');

// Upload Note
exports.createNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        const filePath = req.file ? req.file.path : null;

        const newNote = new Note({
            title,
            description,
            filePath,
            createdAt: new Date(),  // Assuming `req.user` has teacher info
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({ message: 'Error creating note' });
    }
};

// Get All Notes
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes' });
    }
};

// Download Note
exports.downloadNote = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);

        if (!note || !note.file) {
            return res.status(404).json({ message: 'Note or file not found' });
        }

        // Assuming 'file' stores the filename or the full path
        const filePath = path.join(__dirname, '../uploads/notes', note.file);

        res.download(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error downloading file' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
