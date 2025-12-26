// models/Todo.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: String,
  userEmail: {
    type: String,
    required: true, // Google login se milta hai
  },
  status: {
    type: String,
    enum: ["incomplete", "in-progress", "complete"],
    default: "incomplete",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
