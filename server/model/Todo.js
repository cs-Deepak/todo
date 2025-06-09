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
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Todo", todoSchema);
