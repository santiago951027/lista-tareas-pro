import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar:", err));

// Levantar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
