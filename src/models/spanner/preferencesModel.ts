import { database } from "../../config/database";
import logger from "../../config/logger";
import { z } from "zod";
import { runSingleRowQuery } from "../../helpers/spannerHelpers";

// Definir el nuevo esquema de validación de preferencias
const preferencesSchema = z.object({
  userId: z.string(),
  teams: z.array(z.string()),
  players: z.array(z.string()),
  playTypes: z.array(z.string()),
  createdAt: z.string(), // TIMESTAMP en formato ISO
});

export type Preferences = z.infer<typeof preferencesSchema>;

const getPreferencesByUserId = async (
  userId: string
): Promise<Preferences | null> => {
  try {
    const query = "SELECT * FROM Preferences WHERE userId = @userId";
    return await runSingleRowQuery(query, { userId }, preferencesSchema);
  } catch (error) {
    logger.error(`Error obteniendo preferencias del usuario: ${error}`);
    throw new Error("Error al obtener las preferencias del usuario.");
  }
};

const setPreferences = async (preferences: Preferences): Promise<void> => {
  try {
    preferencesSchema.parse(preferences);
    await database.upsert({
      table: "Preferences",
      columns: ["userId", "teams", "players", "playTypes", "createdAt"],
      values: [preferences],
    });
    logger.info(
      `Preferencias actualizadas para el usuario ID: ${preferences.userId}`
    );
  } catch (error) {
    logger.error(`Error actualizando preferencias: ${error}`);
    throw new Error("Error al actualizar las preferencias.");
  }
};

const deletePreferences = async (userId: string): Promise<void> => {
  try {
    const query = `DELETE FROM Preferences WHERE userId = @userId`;
    await database.run({ sql: query, params: { userId } });
    logger.info(`Preferencias eliminadas para el usuario ID: ${userId}`);
  } catch (error) {
    logger.error(`Error eliminando preferencias: ${error}`);
    throw new Error("Error al eliminar las preferencias.");
  }
};

export { getPreferencesByUserId, setPreferences, deletePreferences };
