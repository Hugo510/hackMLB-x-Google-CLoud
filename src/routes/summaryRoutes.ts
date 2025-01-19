import { Router } from "express";
import {
  getSummariesController,
  createSummaryController,
} from "../controllers/summariesController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

// Rutas protegidas para resúmenes
router.get("/user/:userId", authenticate, getSummariesController);
router.post("/", authenticate, createSummaryController);

// ...otras rutas si son necesarias...

export default router;
