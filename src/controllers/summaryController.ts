import { Request, Response, NextFunction } from "express";
import {
  fetchSummariesByUserId,
  fetchCreateSummary,
} from "../services/summaryService";
import { Summary } from "../models/firestore/summariesModel";

// Obtener resúmenes de un usuario
export const getSummariesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: "El parámetro userId es obligatorio." });
      return;
    }
    // Recibir la estructura completa { summaries, lastCreatedAt }
    const { summaries, lastCreatedAt } = await fetchSummariesByUserId(userId);
    // Enviar ambas propiedades en la respuesta
    res.status(200).json({ summaries, lastCreatedAt });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

// Crear un nuevo resumen
export const createSummaryController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const summary: Omit<Summary, "id" | "createdAt"> = req.body;
    // Validar que los campos necesarios estén presentes
    if (!summary.userId || !summary.content) {
      res
        .status(400)
        .json({ message: "Faltan campos requeridos en el resumen." });
      return;
    }
    await fetchCreateSummary(summary);
    res.status(201).json({ message: "Resumen creado exitosamente" });
  } catch (error) {
    next(error);
  }
};

// ...otras funciones si son necesarias...
