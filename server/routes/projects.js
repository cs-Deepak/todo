const express = require("express");
const router = express.Router();
const Project = require("../model/Project");
const Todo = require("../model/Todo");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// GET all projects with task stats
router.get("/", verifyToken, async (req, res) => {
  try {
    const projects = await Project.find({ userEmail: req.user.email });
    
    // Enrich with task counts (this is N+1 but fine for small scale)
    // Better way is aggregation but let's keep it simple for now or use Promise.all
    const projectsWithStats = await Promise.all(projects.map(async (p) => {
        const total = await Todo.countDocuments({ projectId: p._id });
        const completed = await Todo.countDocuments({ projectId: p._id, status: 'complete' });
        return {
            ...p.toObject(),
            total,
            completed
        };
    }));

    res.json(projectsWithStats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new project
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("Creating project with body:", req.body);
    console.log("User:", req.user);
    const { title, category, color, icon } = req.body;
    const project = new Project({
      title,
      category,
      color,
      icon,
      userEmail: req.user.email,
    });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error creating project", error: err });
  }
});

// PUT update project
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title, category, color, icon } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userEmail: req.user.email },
      { title, category, color, icon },
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE project
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    // Optionally delete all todos in this project
    await Todo.deleteMany({ projectId: req.params.id }); 
    
    await Project.findOneAndDelete({
      _id: req.params.id,
      userEmail: req.user.email,
    });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
