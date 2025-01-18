import { Router } from "express";
// ...importar controladores...
import {
  getPreferencesController,
  setPreferencesController,
  deletePreferencesController,
} from "../controllers/preferencesController";

const router = Router();

// Definir rutas de preferencias
router.get("/:userId", getPreferencesController);
router.put("/:userId", setPreferencesController);
router.delete("/:userId", deletePreferencesController);
// ...otras rutas...

export default router;
