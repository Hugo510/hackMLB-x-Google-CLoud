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
  try {
    const { userId, teams, players, playTypes } = req.body;

    // Verificar si la tabla Teams está poblada
    const teamsPopulated = await isTeamsTablePopulated();
    if (!teamsPopulated) {
      // Utilizar el servicio para almacenar los mapeos de equipos
      await storeTeamMappings();
    }

    // Mapear nombres de equipos a IDs
    const teamIds: string[] = [];
    for (const teamName of teams) {
      const teamId = await getTeamIdByName(teamName);
      if (teamId) {
        teamIds.push(teamId);
      } else {
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
      createdAt: new Date().toISOString(),
    };
    await setPreferences(preferences);
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
