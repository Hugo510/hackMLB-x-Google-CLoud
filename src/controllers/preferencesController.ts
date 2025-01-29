import { Request, Response } from "express";
import {
  getPreferencesByUserId,
  setPreferences,
} from "../models/spanner/preferencesModel";
import { sendErrorResponse } from "../helpers/errorResponseHelper";
import {
  getTeamIdByName,
  isTeamsTablePopulated,
} from "../models/spanner/teamsModel";
import { storeTeamMappings } from "../services/teamMappingsService"; // Importar el servicio
import { triggerSetupProcess } from "../services/setupTasksService";

import logger from "../config/logger";

/**
 * @desc Obtener preferencias de usuario por ID
 * @route GET /api/users/preferences/:userId
 * @access Privado
 * @param {string} userId - ID del usuario
 * @returns {Object} Preferencias del usuario
 */
export const getPreferencesController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const preferences = await getPreferencesByUserId(userId);
    if (preferences) {
      res.json(preferences);
    } else {
      sendErrorResponse(
        res,
        404,
        "Preferencias no encontradas para el usuario."
      );
    }
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      "Error obteniendo las preferencias del usuario."
    );
  }
};

/**
 * @desc Crear o actualizar preferencias de usuario
 * @route POST /api/users/preferences
 * @access Privado
 * @param {Object} preferences - Datos de las preferencias
 * @returns {Object} Mensaje de éxito
 */
export const setPreferencesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  // logger.info("setPreferencesController llamado con body:", req.body);
  try {
    const { userId, teams, players, playTypes } = req.body;

    // logger.info("Verificando si la tabla Teams está poblada.");
    const teamsPopulated = await isTeamsTablePopulated();
    // logger.info("Tabla Teams poblada:", teamsPopulated);
    if (!teamsPopulated) {
      // logger.info("Tabla Teams no poblada. Almacenando mapeos de equipos.");
      await storeTeamMappings();
    }

    // logger.info("Mapeando nombres de equipos a IDs.");
    const teamIds: string[] = [];
    for (const teamName of teams) {
      // logger.info(`Obteniendo ID para el equipo: ${teamName}`);
      const teamId = await getTeamIdByName(teamName);
      // logger.info(`ID obtenido para ${teamName}: ${teamId}`);
      if (teamId) {
        teamIds.push(teamId);
      } else {
        logger.warn(`Equipo no encontrado: ${teamName}`);
        res.status(400).send(`Equipo no encontrado: ${teamName}`);
        return;
      }
    }

    // Aquí puedes agregar lógica similar para mapear jugadores si tienes una tabla Players

    const preferences = {
      userId,
      teams: teamIds, // Guardar IDs en lugar de nombres
      players,
      playTypes,
    };
    // logger.info("Preferencias mapeadas antes de guardar:", preferences);
    await setPreferences(preferences);
    // logger.info("Preferencias guardadas correctamente.");
    await triggerSetupProcess(preferences.userId); // Encolar tarea en Cloud Tasks
    // logger.info("Tarea de configuración encolada.");
    res
      .status(201)
      .json({ message: "Preferencias actualizadas exitosamente." });
  } catch (error) {
    logger.error(`Error actualizando preferencias: ${error}`);
    sendErrorResponse(
      res,
      500,
      "Error actualizando las preferencias del usuario."
    );
  }
};

export const getUserPreferencesDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const preferences = await getPreferencesByUserId(userId);

    if (!preferences) {
      return sendErrorResponse(
        res,
        404,
        "No se encontraron preferencias para este usuario"
      );
    }

    // Estructurar la respuesta con información detallada
    const response = {
      userId: preferences.userId,
      preferences: {
        teams: preferences.teams,
        players: preferences.players,
        playTypes: preferences.playTypes,
      },
    };

    logger.info(`Preferencias recuperadas para el usuario: ${userId}`);
    res.status(200).json(response);
  } catch (error) {
    logger.error(`Error al obtener preferencias: ${error}`);
    sendErrorResponse(
      res,
      500,
      "Error al recuperar las preferencias del usuario"
    );
  }
};
