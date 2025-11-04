// routes/todo.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

// ✅ Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // "Bearer token"
  if (!token) return res.status(401).json({ message: "Invalid token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // decoded payload
    next();
  });
};

// ✅ GET all todos for a logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userEmail: req.user.email });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST new todo
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, body } = req.body;
    const todo = new Todo({
      title,
      body,
      userEmail: req.user.email, // fetched from JWT
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo", error: err });
  }
});

// ✅ PUT (update)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userEmail: req.user.email },
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userEmail: req.user.email,
    });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
