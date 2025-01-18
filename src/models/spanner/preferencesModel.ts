import { database } from "../../config/database.js";
import logger from "../../config/logger.js";
import { z } from "zod";

// Definir el esquema de validación de preferencias
const preferencesSchema = z.object({
  user_id: z.string(),
  preferences: z.string(),
  updated_at: z.string().optional(),
});

type Preferences = z.infer<typeof preferencesSchema>;

const getPreferencesByUserId = async (
  userId: string
): Promise<Preferences[]> => {
  try {
    const query = `SELECT * FROM Preferences WHERE user_id = @userId`;
    const [rows] = await database.run({
      sql: query,
      params: { userId },
    });
    return rows.map((row) => preferencesSchema.parse(row));
  } catch (error) {
    logger.error(`Error obteniendo preferencias del usuario: ${error}`);
    throw new Error("Error al obtener las preferencias del usuario.");
  }
};

const setPreferences = async (
  userId: string,
  preferences: object
): Promise<void> => {
  try {
    const preferencesRow: Preferences = {
      user_id: userId,
      preferences: JSON.stringify(preferences),
      updated_at: new Date().toISOString(),
    };
    preferencesSchema.parse(preferencesRow);
    await database.upsert({
      table: "Preferences",
      columns: ["user_id", "preferences", "updated_at"],
      values: [preferencesRow],
    });
    logger.info(`Preferencias actualizadas para el usuario ID: ${userId}`);
  } catch (error) {
    logger.error(`Error actualizando preferencias: ${error}`);
    throw new Error("Error al actualizar las preferencias.");
  }
};

export { getPreferencesByUserId, setPreferences };
