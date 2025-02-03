import { Router } from "express";
import {
  generateSummary,
  getSummaries,
  getAllSummaries,
} from "../controllers/summaryController";
/* import { authenticate } from "../middleware/authenticate"; */

const router = Router();

// Ruta para generar summary
router.post("/", /* authenticate, */ generateSummary);

// Ruta para obtener todos los summaries
router.get("/", /* authenticate, */ getAllSummaries);

// Ruta para obtener summaries de un usuario específico (con parámetro en la ruta)
router.get("/user/:userId", /* authenticate, */ getSummaries);

// ...otras rutas si son necesarias...

export default router;
