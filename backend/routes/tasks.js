import express from "express";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas las rutas usan el middleware protect
router.use(authMiddleware);

// GET /api/tasks → obtener todas las tareas del usuario
router.get("/", async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// POST /api/tasks → crear una nueva tarea
router.post("/", async (req, res) => {
  const { title } = req.body;
  const task = new Task({ user: req.user._id, title });
  await task.save();
  res.status(201).json(task);
});

// PUT /api/tasks/:id → actualizar tarea (title o completed)
router.put("/:id", async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

  task.title = req.body.title !== undefined ? req.body.title : task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  await task.save();

  res.json(task);
});

// DELETE /api/tasks/:id → eliminar tarea
router.delete("/:id", async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

  res.json({ message: "Tarea eliminada" });
});

export default router;
