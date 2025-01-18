import { Request, Response } from "express";
import {
  fetchPreferences,
  fetchSetPreferences,
  fetchDeletePreferences,
} from "../services/preferencesService";
import { Preferences } from "../models/spanner/preferencesModel";

export const getPreferencesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const preferences = await fetchPreferences(userId);
    res.status(200).json(preferences);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las preferencias", error });
  }
};

export const setPreferencesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const preferencesData: object = req.body;
    await fetchSetPreferences(userId, preferencesData);
    res.status(200).json({ message: "Preferencias actualizadas exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar las preferencias", error });
  }
};

export const deletePreferencesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    await fetchDeletePreferences(userId);
    res.status(200).json({ message: "Preferencias eliminadas exitosamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar las preferencias", error });
  }
};
