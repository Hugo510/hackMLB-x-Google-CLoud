import { Request, Response } from "express";
import logger from "../config/logger";
import { getSeasonSchedule } from "../services/mlbStatsService";
import { getPreferencesByUserId } from "../models/spanner/preferencesModel";
import { setWithExpiration } from "../config/redis";

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
    // 1. Obtener las preferencias del usuario usando el modelo existente
    const preferences = await getPreferencesByUserId(userId);

    if (!preferences) {
      res.status(404).send("No preferences found for this user.");
      return;
    }

    // Obtener calendario de la temporada
    const schedule = await getSeasonSchedule();

    // Filtrar juegos relacionados con los equipos favoritos
    const relevantGames = schedule.dates.flatMap((date: any) =>
      date.games.filter(
        (game: any) =>
          preferences.teams.includes(game.teams.home.team.id) ||
          preferences.teams.includes(game.teams.away.team.id)
      )
    );

    // Almacenar en Redis (cache)
    await setWithExpiration(
      `relevantGames:${userId}`,
      JSON.stringify(relevantGames)
    );

    logger.info(`Setup completed for userId: ${userId}`);
    res.status(200).send("Setup completed.");
  } catch (error) {
    logger.error(`Error in setup process: ${error}`);
    res.status(500).send("Error in setup process.");
  }
};

export default setupUserPreferences;
