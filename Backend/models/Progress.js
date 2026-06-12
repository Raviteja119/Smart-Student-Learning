const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  completedLessons: {
    type: Number,
    default: 0
  },

  totalLessons: {
    type: Number,
    default: 0
  },

  percentage: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Progress", progressSchema);