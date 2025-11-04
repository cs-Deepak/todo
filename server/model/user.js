const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
