const Assignment = require('../models/assignmentSchema'); // Assume Assignment is a Mongoose model
const Submission = require('../models/submissionSchema'); // Assume Submission is a Mongoose model for student answers
const path = require('path');
const fs = require('fs');

// Controller to create a new assignment (for teachers)
exports.createAssignment = async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file;

        // Check required fields
        if (!title || !description || !file) {
            return res.status(400).json({ message: "Title, description, and file are required." });
        }

        // Store assignment data in the database
        const newAssignment = new Assignment({
            title,
            description,
            filePath: file.path,
            createdAt: new Date(),
        });
        await newAssignment.save();

        res.status(201).json({ message: "Assignment created successfully", assignment: newAssignment });
    } catch (error) {
        console.error("Error creating assignment:", error);
        res.status(500).json({ message: "Server error. Could not create assignment." });
    }
};

// Controller to fetch all assignments (for students)
exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find().sort({ createdAt: -1 }); // Sort by latest first
        res.status(200).json(assignments);
    } catch (error) {
        console.error("Error fetching assignments:", error);
        res.status(500).json({ message: "Server error. Could not retrieve assignments." });
    }
};

// Controller for students to submit their answers
exports.submitAnswer = async (req, res) => {
    try {
        const { assignmentId, studentId } = req.body;
        const answerFile = req.file;

        // Validate required fields
        if (!assignmentId || !studentId || !answerFile) {
            return res.status(400).json({ message: "Assignment ID, student ID, and answer file are required." });
        }

        // Store the student's answer in the database
        const newSubmission = new Submission({
            assignmentId,
            studentId,
            answerFilePath: answerFile.path,
            submittedAt: new Date(),
        });
        await newSubmission.save();

        res.status(201).json({ message: "Answer submitted successfully", submission: newSubmission });
    } catch (error) {
        console.error("Error submitting answer:", error);
        res.status(500).json({ message: "Server error. Could not submit answer." });
    }
};

// Controller to download assignment file (for students)
exports.downloadAssignmentFile = async (req, res) => {
    try {
        const { assignmentId } = req.params;

        // Find the assignment by ID
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Download the assignment file
        const filePath = assignment.filePath;
        res.download(filePath, path.basename(filePath), (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (error) {
        console.error("Error fetching assignment file:", error);
        res.status(500).json({ message: "Server error. Could not download assignment file." });
    }
};

// Controller to download student's submitted answer (for teachers)
exports.downloadAnswerFile = async (req, res) => {
    try {
        const { submissionId } = req.params;

        // Find the submission by ID
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found" });
        }

        // Download the student's answer file
        const filePath = submission.answerFilePath;
        res.download(filePath, path.basename(filePath), (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.status(500).json({ message: "Error downloading file" });
            }
        });
    } catch (error) {
        console.error("Error fetching submission file:", error);
        res.status(500).json({ message: "Server error. Could not download submission file." });
    }
};
