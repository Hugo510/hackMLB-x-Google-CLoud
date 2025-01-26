import { Request, Response } from "express";
import { getPreferencesByUserId } from "../models/spanner/preferencesModel";
import logger from "../config/logger";
import { sendErrorResponse } from "../helpers/errorResponseHelper";

/**
 * @desc Obtener las preferencias completas de un usuario
 * @route GET /api/users/:userId/preferences/full
 * @access Privado
 */
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
      lastUpdated: preferences.createdAt,
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
