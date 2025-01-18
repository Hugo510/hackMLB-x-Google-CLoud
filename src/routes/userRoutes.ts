import { Router } from "express";
// ...importar controladores...
import {
  getAllUsersController,
  getUserDetailsController,
  createUserController,
  updateUserController,
  deleteUserController,
  signup,
  login,
} from "../controllers/userController";

import { authenticate } from "../middleware/authenticate";
import rateLimit from "express-rate-limit"; // Rehabilitar la importación

const router = Router();

// Limitar solicitudes para evitar ataques de fuerza bruta
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 solicitudes por IP
  message:
    "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.",
});

// Definir rutas de autenticación
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);

// Definir rutas de usuarios protegidas
router.get("/", authenticate, getAllUsersController);
router.get("/:userId", authenticate, getUserDetailsController);
router.post("/", createUserController);
router.put("/:userId", authenticate, updateUserController);
router.delete("/:userId", authenticate, deleteUserController);
// ...otras rutas...

export default router;
