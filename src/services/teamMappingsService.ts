import { getSeasonSchedule } from "../services/mlbStatsService";
/* import { setWithExpiration } from "../config/redis"; */
import logger from "../config/logger";
import { upsertTeams } from "../models/spanner/teamsModel";

/**
 * @desc Almacenar mapeos de equipos en Spanner y Redis
 * @returns {Promise<void>}
 */
export const storeTeamMappings = async (): Promise<void> => {
  const seasonSchedule = await getSeasonSchedule();
  if (!seasonSchedule || !seasonSchedule.dates) {
    throw new Error("No se encontraron datos de la temporada.");
  }

  // Construir map de equipos
  const teamMappings = new Map<string, number>();
  seasonSchedule.dates.forEach((date: any) => {
    date.games.forEach((game: any) => {
      const homeTeam = game.teams.home.team;
      const awayTeam = game.teams.away.team;
      teamMappings.set(homeTeam.name, homeTeam.id);
      teamMappings.set(awayTeam.name, awayTeam.id);
    });
  });

  // Convertir el map en objeto
  const mappingsObject: Record<string, string> = {};
  teamMappings.forEach((teamId, teamName) => {
    mappingsObject[teamName] = teamId.toString();
  });

  // Guardar en Spanner
  await upsertTeams(mappingsObject);

  // Guardar en Redis
  /* await setWithExpiration("TEAM_MAPPINGS", JSON.stringify(mappingsObject)); */

  logger.info("Team mappings almacenados correctamente en Spanner y Redis.");
};
