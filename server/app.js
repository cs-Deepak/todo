require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connectDB = require("./db/conn");
const manualAuthRoutes = require("./routes/manualAuthRoutes");
const Todo = require("./model/Todo");

const app = express();

// ✅ Connect MongoDB
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Middleware
// Use a dynamic origin function so we can accept Vercel/Render deployments and local dev
const allowedClient = (
  process.env.CLIENT_URL ||
  process.env.VITE_API_URL ||
  ""
).replace(/\/$/, "");
console.log(
  "CORS allowedClient:",
  allowedClient || "not set, using wildcard for .vercel.app and .onrender.com"
);
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like curl, mobile apps or server-to-server
      if (!origin) return callback(null, true);
      const allowed = new Set(
        [
          allowedClient,
          "http://localhost:5173",
          "http://localhost:3000",
        ].filter(Boolean)
      );

      // accept any vercel or onrender subdomain (production)
      if (origin.endsWith(".vercel.app") || origin.endsWith(".onrender.com")) {
        return callback(null, true);
      }

      if (allowed.has(origin)) return callback(null, true);
      console.warn("Blocked CORS Origin:", origin);
      return callback(
        new Error("CORS policy does not allow this origin"),
        false
      );
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/auth", manualAuthRoutes); // manual login/signup

// ======================================================
// ✅ JWT Middleware
// ======================================================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user; // decoded { email }
    next();
  });
};

// ======================================================
// ✅ Todo APIs (JWT Protected)
// ======================================================

// ✅ Add new todo
app.post("/api/todos", verifyToken, async (req, res) => {
  try {
    const { title, body, status } = req.body;
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    const todo = new Todo({
      title,
      body,
      status: status || "incomplete",
      userEmail: req.user.email, // fetched from JWT
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving todo" });
  }
});

// ✅ Get all todos for logged-in user
app.get("/api/todos", verifyToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userEmail: req.user.email });
    // Ensure older todos without a status field are treated as 'incomplete' in responses
    const normalized = todos.map((t) => ({
      _id: t._id,
      title: t.title,
      body: t.body,
      userEmail: t.userEmail,
      status: t.status || "incomplete",
      createdAt: t.createdAt,
    }));
    res.json(normalized);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

// ✅ Update todo
app.put("/api/todos/:id", verifyToken, async (req, res) => {
  try {
    const { title, body, status } = req.body;

    const update = {};
    if (title !== undefined) update.title = title;
    if (body !== undefined) update.body = body;
    if (status !== undefined) update.status = status;

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userEmail: req.user.email },
      update,
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

// ✅ Delete todo
app.delete("/api/todos/:id", verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userEmail: req.user.email,
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

// ======================================================
// ✅ Root Test Route
// ======================================================
app.get("/", (req, res) => {
  res.send("🎉 Backend running with manual JWT auth (Google OAuth removed)!");
});

// ✅ Start Server
const PORT = process.env.PORT || 6005;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
