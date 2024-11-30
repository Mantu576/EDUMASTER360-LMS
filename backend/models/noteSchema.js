const mongoose=require("mongoose");
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    file: { type: String }, // Optional file for notes
    //teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Note', noteSchema);
  