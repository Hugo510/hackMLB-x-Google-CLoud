import { Router } from "express";
// ...importar controladores...
import {
  getGames,
  getGameDetails,
  createGameController,
  updateGameController,
  deleteGameController,
} from "../controllers/gameController";

const router = Router();

// Definir rutas de juegos
router.get("/schedule", getGames);
router.get("/:gameId", getGameDetails);
router.post("/", createGameController);
router.put("/:gameId", updateGameController);
router.delete("/:gameId", deleteGameController);
// ...otras rutas...

export default router;
