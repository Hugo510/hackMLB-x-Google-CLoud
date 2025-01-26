import { Request, Response } from "express";
import logger from "../config/logger";
import { getSeasonSchedule } from "../services/mlbStatsService";
import { getPreferencesByUserId } from "../models/spanner/preferencesModel";

/**
 * @desc Configurar preferencias iniciales del usuario
 * @route POST /api/setup/preferences
 * @access Privado
 * @param {string} userId - ID del usuario
 * @returns {Object} Mensaje de éxito o error
 */
const setupUserPreferences = async (req: Request, res: Response) => {
  const { userId } = req.body;

  try {
    // 1. Obtener las preferencias del usuario usando el modelo existente
    const preferences = await getPreferencesByUserId(userId);

    if (!preferences) {
      res.status(404).send("No preferences found for this user.");
      return;
    }

    // 2. Consultar datos iniciales (juegos próximos de equipos favoritos)
    const upcomingGames = await Promise.all(
      preferences.teams.map(async (teamId: string) => {
        const data = await getSeasonSchedule();
        return data;
      })
    );

    // 3. Almacenar en Redis (cache) - Comentado temporalmente
    // ...existing code...

    logger.info(`Setup completed for userId: ${userId}`);
    res.status(200).send("Setup completed.");
  } catch (error) {
    logger.error(`Error in setup process: ${error}`);
    res.status(500).send("Error in setup process.");
  }
};

export default setupUserPreferences;
