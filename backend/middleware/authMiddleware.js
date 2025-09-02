// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // ajusta la ruta si tu modelo se llama distinto

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Soportar varias formas de payload (id, _id, userId, sub)
    const userId = decoded.id || decoded._id || decoded.userId || decoded.sub;
    if (!userId) return res.status(401).json({ message: 'Token inválido' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

    req.user = user; // <-- aquí añadimos la info del usuario para usarla en controladores
    next();
  } catch (error) {
    console.error('authMiddleware error:', error);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export default authMiddleware;
