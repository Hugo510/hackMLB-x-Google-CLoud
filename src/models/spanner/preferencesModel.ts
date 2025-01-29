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
  // createdAt eliminado
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
    preferencesSchema.parse(preferences); // Validar preferencias
    logger.info("Preferencias validadas correctamente.");

    await database.runTransaction(async (err, transaction) => {
      if (err) {
        logger.error(`Error iniciando la transacción: ${err}`);
        throw new Error("Error al iniciar la transacción.");
      }
      if (!transaction) {
        logger.error("Transacción no iniciada correctamente.");
        throw new Error("Transacción no iniciada correctamente.");
      }

      // Verificar si las preferencias existen
      logger.info("Verificando existencia de preferencias para el usuario.");
      const selectQuery =
        "SELECT COUNT(*) as count FROM Preferences WHERE userId = @userId";
      const [rows] = await transaction.run({
        sql: selectQuery,
        params: { userId: preferences.userId },
      });

      const row = rows[0].toJSON();
      const exists = row.count > 0;
      logger.info(`Preferencias existentes: ${exists}`);

      if (exists) {
        // Actualizar preferencias existentes sin 'createdAt'
        logger.info("Actualizando preferencias existentes.");
        const updateQuery = `
          UPDATE Preferences
          SET teams = @teams, players = @players, playTypes = @playTypes, createdAt = PENDING_COMMIT_TIMESTAMP()
          WHERE userId = @userId
        `;
        await transaction.runUpdate({
          sql: updateQuery,
          params: preferences,
        });
        logger.info("Preferencias actualizadas correctamente.");
      } else {
        // Insertar nuevas preferencias sin 'createdAt'
        logger.info("Insertando nuevas preferencias.");
        const insertQuery = `
          INSERT INTO Preferences (userId, teams, players, playTypes, createdAt)
          VALUES (@userId, @teams, @players, @playTypes, PENDING_COMMIT_TIMESTAMP())
        `;
        await transaction.runUpdate({
          sql: insertQuery,
          params: preferences,
        });
        logger.info("Preferencias insertadas correctamente.");
      }

      await transaction.commit();
      logger.info("Transacción comprometida.");
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

/**
 * Retorna todos los usuarios cuyas preferencias incluyan el tipo de jugada,
 * el equipo o el jugador que generó el evento.
 */
export async function getAllUsersWithTeamOrPlayer(
  playEvent: any
): Promise<any[]> {
  try {
    const eventType = playEvent.result?.eventType || "";
    // Suponiendo que el evento contiene "teamId" y/o "playerId":
    const teamId = playEvent.teamId || "";
    const playerId = playEvent.playerId || "";

    // Consultar todas las preferencias
    const query = {
      sql: `SELECT userId, teams, players, playTypes
            FROM preferences`,
    };
    const [rows] = await database.run(query);

    const users: any[] = [];
    rows.forEach((row: any) => {
      const userId = row.toJSON().userId;
      const teams = row.toJSON().teams || [];
      const players = row.toJSON().players || [];
      const playTypes = row.toJSON().playTypes || [];

      // Verificar si coincide con el tipo de jugada o equipo/jugador
      const matchesEventType = playTypes.includes(eventType);
      const matchesTeam = teams.includes(teamId);
      const matchesPlayer = players.includes(playerId);

      if (matchesEventType || matchesTeam || matchesPlayer) {
        users.push({ id: userId });
      }
    });

    return users;
  } catch (error) {
    logger.error("Error obteniendo usuarios con preferencias:", error);
    return [];
  }
}

export { getPreferencesByUserId, setPreferences, deletePreferences };
