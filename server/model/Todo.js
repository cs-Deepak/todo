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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
