import { Router } from "express";
import { setupUserPreferences } from "../controllers/setupController";
import { celebrate, Joi } from "celebrate";

const router = Router();

/**
 * @route POST /api/setup/preferences
 * @desc Configurar preferencias iniciales del usuario
 * @access Privado
 */
router.post(
  "/preferences",
  celebrate({
    body: Joi.object({
      userId: Joi.string().required(),
    }),
  }),
  setupUserPreferences
);

export default router;
