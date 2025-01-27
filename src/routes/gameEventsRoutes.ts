import { Router } from "express";
import {
  getGameEventsController,
  addGameEventController,
} from "../controllers/gameEventsController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

/**
 * Rutas protegidas para eventos de juegos
 */
router.get("/:gameId/events", authenticate, getGameEventsController);
router.post("/:gameId/events", authenticate, addGameEventController);

// ...otras rutas si son necesarias...

export default router;
