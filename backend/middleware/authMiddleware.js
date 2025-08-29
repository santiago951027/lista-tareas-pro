import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Revisamos si el header Authorization existe y empieza con "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extraemos el token del header
      token = req.headers.authorization.split(" ")[1];

      // Verificamos el token usando la clave secreta
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscamos el usuario en la base de datos (sin la contraseña)
      req.user = await User.findById(decoded.id).select("-password");

      // Pasamos al siguiente middleware o ruta
      next();
    } catch (error) {
      res.status(401).json({ message: "No autorizado, token inválido" });
    }
  } else {
    res.status(401).json({ message: "No autorizado, token faltante" });
  }
};
