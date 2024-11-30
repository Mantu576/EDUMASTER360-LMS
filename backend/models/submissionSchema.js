const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    studentId: { type: String, required: true },
    answerFilePath: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Submission', submissionSchema);
