const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  icon: {
    type: String
  },

  progress: {
    type: String,
    default: "0%"
  },

  progressPercent: {
    type: Number,
    default: 0
  },

  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

module.exports = mongoose.model("Course",courseSchema);