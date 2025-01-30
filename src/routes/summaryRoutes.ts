import { Router } from "express";
import { generateSummary } from "../controllers/summaryController";
/* import { authenticate } from "../middleware/authenticate"; */

const router = Router();

// Rutas protegidas para resúmenes
/**
 * @route POST /api/summaries
 * @desc Generar resúmenes personalizados
 * @access Privado
 */
router.post("/", /* authenticate, */ generateSummary);

// ...otras rutas si son necesarias...

export default router;
