import { useState, useEffect } from "react";
import API from "../services/api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Cargar tareas al entrar a la página
  useEffect(() => {
    fetchTasks();
  }, []);

const fetchTasks = async () => {
  try {
    const token = localStorage.getItem("token"); // 👈 traemos token
    const res = await API.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` }, // 👈 lo enviamos
    });
    setTasks(res.data);
  } catch (err) {
    alert("Error al cargar tareas: " + (err.response?.data?.message || err.message));
  }
};

const addTask = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const res = await API.post(
      "/tasks",
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } } // 👈 también aquí
    );
    setTasks([...tasks, res.data]);
    setTitle("");
    setDescription("");
  } catch (err) {
    alert("Error al crear tarea: " + (err.response?.data?.message || err.message));
  }
};

const deleteTask = async (id) => {
  try {
    const token = localStorage.getItem("token");
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }, // 👈 aquí también
    });
    setTasks(tasks.filter((task) => task._id !== id));
  } catch (err) {
    alert("Error al eliminar tarea: " + (err.response?.data?.message || err.message));
  }
};


  return (
    <div>
      <h1>Mis Tareas</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button type="submit">Agregar Tarea</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong>: {task.description}
            <button onClick={() => deleteTask(task._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;

