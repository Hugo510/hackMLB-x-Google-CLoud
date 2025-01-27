import { Request, Response } from "express";
import logger from "../config/logger";
import { setupUserPreferencesService } from "../services/userSetupService";

/**
 * @desc Configurar preferencias iniciales del usuario
 * @route POST /api/setup/preferences
 * @access Privado
 * @param {string} userId - ID del usuario
 * @returns {Object} Mensaje de éxito o error
 */
const setupUserPreferences = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.body;

  try {
    await setupUserPreferencesService(userId);
    res.status(200).send("Setup completed.");
  } catch (error) {
    logger.error(`Error in setup process: ${error}`);
    res.status(500).send("Error in setup process.");
  }
};

export { setupUserPreferences };
