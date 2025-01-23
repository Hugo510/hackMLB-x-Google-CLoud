import { Request, Response } from "express";
import {
  getPreferencesByUserId,
  setPreferences,
} from "../models/spanner/preferencesModel";
import { sendErrorResponse } from "../helpers/errorResponseHelper";

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
export const setPreferencesController = async (req: Request, res: Response) => {
  try {
    const { userId, teams, players, playTypes } = req.body;
    const preferences = {
      userId,
      teams,
      players,
      playTypes,
      createdAt: new Date().toISOString(),
    };
    await setPreferences(preferences);
    res
      .status(201)
      .json({ message: "Preferencias actualizadas exitosamente." });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      "Error actualizando las preferencias del usuario."
    );
  }
};
