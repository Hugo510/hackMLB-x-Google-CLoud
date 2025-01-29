import logger from "../config/logger";
import { getSeasonSchedule } from "./mlbStatsService";
import { getPreferencesByUserId } from "../models/spanner/preferencesModel";
/* import { setWithExpiration } from "../config/redis"; */

export const setupUserPreferencesService = async (
  userId: string
): Promise<void> => {
  try {
    logger.info(`Inicio de setupUserPreferencesService para userId: ${userId}`);

    // 1. Obtener las preferencias del usuario usando el modelo existente
    const preferences = await getPreferencesByUserId(userId);
    logger.info(
      `Preferencias obtenidas para userId ${userId}: ${JSON.stringify(
        preferences
      )}`
    );

    if (!preferences) {
      throw new Error("No preferences found for this user.");
    }

    // Obtener calendario de la temporada
    const schedule = await getSeasonSchedule();
    /* logger.info(
      `Calendario de la temporada obtenido: ${JSON.stringify(schedule)}`
    ); */

    // Filtrar juegos relacionados con los equipos favoritos
    const relevantGames = schedule.dates.flatMap((date: any) =>
      date.games.filter(
        (game: any) =>
          preferences.teams.includes(String(game.teams.home.team.id)) || // Conversión a cadena
          preferences.teams.includes(String(game.teams.away.team.id)) // Conversión a cadena
      )
    );
    logger.info(
      `Juegos relevantes filtrados para userId ${userId}: ${JSON.stringify(
        relevantGames
      )}`
    );

    // Almacenar en Redis (cache)
    /* await setWithExpiration(
      `relevantGames:${userId}`,
      JSON.stringify(relevantGames)
    ); */
    logger.info(
      `Relevantes juegos para userId ${userId} listos para almacenar en cache`
    );

    logger.info(
      `Setup completed for userId: ${userId}, Relevant Games Count: ${relevantGames.length}`
    );
  } catch (error) {
    logger.error(`Error in setup process for userId ${userId}: ${error}`);
    throw error;
  }
};
