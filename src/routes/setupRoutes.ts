import { Router } from "express";
import setupUserPreferences from "../controllers/setupController";
import { authenticate } from "../middleware/authenticate";
import { storeTeamMappingsController } from "../controllers/teamMappingsController";

const router = Router();

/**
 * @route POST /api/setup/preferences
 * @desc Configurar preferencias iniciales del usuario
 * @access Privado
 */
router.post("/preferences", authenticate, setupUserPreferences);

/**
 * @route POST /api/setup/team-mappings
 * @desc Almacenar mapeos de equipos en Firestore y Redis
 * @access Privado
 */
router.post("/team-mappings", authenticate, storeTeamMappingsController);

export default router;
