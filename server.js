const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public")); // serve frontend files

let todos = []; // store todos in memory

// API endpoints
app.get("/todos", (req, res) => res.json(todos));

app.post("/todos", (req, res) => {
    const { task } = req.body;
    if (task) {
        const newTodo = { id: Date.now(), task, done: false };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ error: "Task is required" });
    }
});

app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
    res.json(todos.find(t => t.id === id));
});

app.delete("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
