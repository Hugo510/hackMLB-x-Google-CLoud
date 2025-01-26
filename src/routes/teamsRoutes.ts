import { Router } from "express";
import {
  getAllTeamsController,
  createTeamController,
  storeTeamMappingsController,
} from "../controllers/teamsController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

/**
 * @route GET /api/teams
 * @desc Obtener todos los equipos
 * @access Público
 */
router.get("/", getAllTeamsController);

/**
 * @route POST /api/teams
 * @desc Crear un nuevo equipo
 * @access Privado
 */
router.post("/", createTeamController);

/**
 * @route POST /api/teams/team-mappings
 * @desc Almacenar mapeos de equipos en Spanner y Redis
 * @access Privado
 */
router.post("/team-mappings", authenticate, storeTeamMappingsController);

export default router;
