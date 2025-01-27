import logger from "../config/logger";
import { getSeasonSchedule } from "./mlbStatsService";
import { getPreferencesByUserId } from "../models/spanner/preferencesModel";
import { setWithExpiration } from "../config/redis";

export const setupUserPreferencesService = async (
  userId: string
): Promise<void> => {
  try {
    // 1. Obtener las preferencias del usuario usando el modelo existente
    const preferences = await getPreferencesByUserId(userId);

    if (!preferences) {
      throw new Error("No preferences found for this user.");
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
  } catch (error) {
    logger.error(`Error in setup process: ${error}`);
    throw error;
  }
};
