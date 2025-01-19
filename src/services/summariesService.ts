import {
  getSummariesByUserId,
  createSummary,
} from "../models/firestore/summariesModel";
import { Summary } from "../models/firestore/summariesModel";

// Obtener resúmenes de un usuario específico
export const fetchSummariesByUserId = async (
  userId: string
): Promise<Summary[]> => {
  try {
    const summaries = await getSummariesByUserId(userId);
    return summaries;
  } catch (error) {
    throw new Error("Error al obtener los resúmenes del usuario.");
  }
};

// Crear un nuevo resumen para un usuario
export const fetchCreateSummary = async (
  summary: Omit<Summary, "id" | "created_at">
): Promise<void> => {
  try {
    await createSummary(summary);
  } catch (error) {
    throw new Error("Error al crear el resumen.");
  }
};

// ...otras funciones si son necesarias...
