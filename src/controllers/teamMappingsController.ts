import { Request, Response } from "express";
import { getSeasonSchedule } from "../services/mlbStatsService";
import { firestore } from "../config/database";
import { setWithExpiration } from "../config/redis";
import logger from "../config/logger";

/**
 * @desc Almacenar mapeos de equipos en Firestore y Redis
 * @route POST /api/setup/team-mappings
 * @access Privado
 * @param {string} userId - ID del usuario
 * @returns {Object} Mensaje de éxito o error
 */
export const storeTeamMappingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const seasonSchedule = await getSeasonSchedule();
    if (!seasonSchedule || !seasonSchedule.dates) {
      res.status(404).send("No se encontraron datos de la temporada.");
      return;
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
    const mappingsObject: Record<string, number> = {};
    teamMappings.forEach((teamId, teamName) => {
      mappingsObject[teamName] = teamId;
    });

    // Guardar en Firestore
    await firestore
      .collection("teamMappings")
      .doc("current")
      .set({ mappings: mappingsObject });

    // Guardar en Redis
    await setWithExpiration("TEAM_MAPPINGS", JSON.stringify(mappingsObject));

    logger.info(
      "Team mappings almacenados correctamente en Firestore y Redis."
    );
    res
      .status(200)
      .json({ message: "Team mappings almacenados exitosamente." });
  } catch (error) {
    logger.error(`Error al almacenar Team mappings: ${error}`);
    res.status(500).send("Error al almacenar la información de los equipos.");
  }
};
