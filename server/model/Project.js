const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "Personal", // Work, Education, Personal, etc.
  },
  userEmail: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#58a6ff",
  },
  icon: {
    type: String,
    default: "📁",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
