require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

// Prefer MONGO_URI from environment; fall back to MONGO_URL or embedded URI
let mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((todos) => res.json(todos))
    .catch((error) => res.status(500).json({ error: "Error fetching todos" }));
});

app.post("/add", (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task: task })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Delete a todo
app.delete("/delete/:id", (req, res) => {
  TodoModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ error: "Delete failed" }));
});

// Mark as done (toggle)
app.put("/toggle/:id", (req, res) => {
  TodoModel.findById(req.params.id)
    .then((todo) => {
      if (!todo) return res.status(404).json({ error: "Not found" });
      todo.done = !todo.done;
      return todo.save();
    })
    .then((updated) => res.json(updated))
    .catch((err) => res.status(500).json({ error: "Update failed" }));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
