import { Router } from "express";
import setupUserPreferences from "../controllers/setupController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

/**
 * @route POST /api/setup/preferences
 * @desc Configurar preferencias iniciales del usuario
 * @access Privado
 */
router.post("/preferences", authenticate, setupUserPreferences);

export default router;
