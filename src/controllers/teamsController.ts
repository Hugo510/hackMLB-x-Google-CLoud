import { Request, Response } from "express";
import { getAllTeams, createTeam } from "../models/spanner/teamsModel";
import logger from "../config/logger";
import { storeTeamMappings } from "../services/teamMappingsService";

/**
 * @desc Obtener todos los equipos
 * @route GET /api/teams
 * @access Público
 * @returns {Object} Lista de equipos o error
 */
export const getAllTeamsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const teams = await getAllTeams();
    res.status(200).json(teams);
  } catch (error) {
    logger.error(`Error obteniendo equipos: ${error}`);
    res.status(500).send("Error al obtener los equipos.");
  }
};

/**
 * @desc Crear un nuevo equipo
 * @route POST /api/teams
 * @access Privado
 * @returns {Object} Mensaje de éxito o error
 */
export const createTeamController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const team = req.body;
    await createTeam(team);
    res.status(201).json({ message: "Equipo creado exitosamente." });
  } catch (error) {
    logger.error(`Error creando equipo: ${error}`);
    res.status(500).send("Error al crear el equipo.");
  }
};

/**
 * @desc Almacenar mapeos de equipos en Spanner y Redis
 * @route POST /api/teams/team-mappings
 * @access Privado
 * @returns {Object} Mensaje de éxito o error
 */
export const storeTeamMappingsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await storeTeamMappings();
    res
      .status(200)
      .json({ message: "Team mappings almacenados exitosamente." });
  } catch (error) {
    logger.error(`Error al almacenar Team mappings: ${error}`);
    res
      .status(500)
      .json({ error: "Error al almacenar la información de los equipos." });
  }
};
