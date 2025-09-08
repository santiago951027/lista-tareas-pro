import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

const router = express.Router();

// Todas las rutas están protegidas por JWT
router.use(authMiddleware);

// Rutas CRUD
router.get("/", getTasks);        // Obtener todas las tareas
router.post("/", createTask);     // Crear tarea
router.put("/:id", updateTask);   // Actualizar tarea
router.delete("/:id", deleteTask);// Eliminar tarea

export default router;
