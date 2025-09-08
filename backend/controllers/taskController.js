import Task from "../models/Task.js";

/**
 * @desc Crear una nueva tarea
 * @route POST /api/tasks
 * @access Privado (requiere token)
 */
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    // Validación: el título es obligatorio
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    // Crear la nueva tarea asociada al usuario autenticado
    const newTask = new Task({
      user: req.user._id, // El usuario viene del authMiddleware
      title
    });

    // Guardar en la base de datos
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * @desc Obtener todas las tareas del usuario autenticado
 * @route GET /api/tasks
 * @access Privado
 */
export const getTasks = async (req, res) => {
  try {
    // Buscar tareas que pertenecen al usuario y ordenarlas por fecha (más recientes primero)
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * @desc Actualizar una tarea (title y/o completed)
 * @route PUT /api/tasks/:id
 * @access Privado
 */
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Verificar si la tarea existe y pertenece al usuario autenticado
    const task = await Task.findOne({ _id: id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    // Actualización parcial: solo cambiamos lo que viene en el body
    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * @desc Eliminar una tarea
 * @route DELETE /api/tasks/:id
 * @access Privado
 */
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que la tarea existe y pertenece al usuario
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
