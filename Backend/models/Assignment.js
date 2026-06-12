const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  due: String,
  status: String,

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  submissions: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      file: String,
      marks: Number
    }
  ]
});

module.exports = mongoose.model("Assignment",assignmentSchema);