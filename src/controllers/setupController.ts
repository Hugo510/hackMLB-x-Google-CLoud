import { Request, Response } from "express";
import { database } from "../config/database";
// import redis from "../config/redis";
import logger from "../config/logger";
import { getSeasonSchedule } from "../services/mlbStatsService";

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
    // 1. Obtener las preferencias del usuario desde Spanner
    const [preferences] = await database.run({
      sql: `SELECT teams, players, playTypes FROM Preferences WHERE userId = @userId`,
      params: { userId },
    });

    if (!preferences) {
      res.status(404).send("No preferences found for this user.");
      return;
    }

    // 2. Consultar datos iniciales (juegos próximos de equipos favoritos)
    const upcomingGames = await Promise.all(
      (preferences as any).teams.map(async (teamId: string) => {
        const data = await getSeasonSchedule();
        return data;
      })
    );

    // 3. Almacenar en Redis (cache)
    // upcomingGames.forEach((games) => {
    //   games.dates.forEach((date: any) => {
    //     date.games.forEach(async (game: any) => {
    //       const cacheKey = `game:${game.gamePk}:schedule`;
    //       await redis.set(cacheKey, JSON.stringify(game), "EX", 3600); // TTL: 1 hora
    //     });
    //   });
    // });

    logger.info(`Setup completed for userId: ${userId}`);
    res.status(200).send("Setup completed.");
  } catch (error) {
    logger.error(`Error in setup process: ${error}`);
    res.status(500).send("Error in setup process.");
  }
};

export default setupUserPreferences;
