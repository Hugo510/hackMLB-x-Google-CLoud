import { database } from "../../config/database";
import logger from "../../config/logger";
import { z } from "zod";

// Definir el esquema de validación de juegos
const gameSchema = z.object({
  id: z.string(),
  home_team_id: z.string(),
  away_team_id: z.string(),
  date: z.string(),
  venue: z.string(),
  season: z.string(),
  created_at: z.string(),
  updated_at: z.string().optional(),
});

export type Game = z.infer<typeof gameSchema>;

const getGameById = async (gameId: string): Promise<Game | null> => {
  try {
    const query = `
      SELECT *
      FROM Games
      WHERE id = @gameId
    `;
    const [rows] = await database.run({
      sql: query,
      params: { gameId },
    });
    if (rows.length > 0) {
      const game = gameSchema.parse(rows[0]);
      return game;
    }
    return null;
  } catch (error) {
    logger.error(`Error obteniendo juego por ID: ${error}`);
    throw new Error("Error al obtener el juego.");
  }
};

const getGamesBySeason = async (season: string): Promise<Game[]> => {
  try {
    const query = `
      SELECT *
      FROM Games
      WHERE season = @season
      ORDER BY date
    `;
    const [rows] = await database.run({
      sql: query,
      params: { season },
    });
    return rows.map((row) => gameSchema.parse(row));
  } catch (error) {
    logger.error(`Error obteniendo juegos por temporada: ${error}`);
    throw new Error("Error al obtener los juegos por temporada.");
  }
};

const createGame = async (
  game: Omit<Game, "created_at" | "updated_at">
): Promise<void> => {
  try {
    const gameRow: Game = {
      ...game,
      created_at: new Date().toISOString(),
    };
    gameSchema.parse(gameRow);
    await database.insert({
      table: "Games",
      columns: [
        "id",
        "home_team_id",
        "away_team_id",
        "date",
        "venue",
        "season",
        "created_at",
      ],
      values: [gameRow],
    });
    logger.info(`Juego creado con ID: ${game.id}`);
  } catch (error) {
    logger.error(`Error creando juego: ${error}`);
    throw new Error("Error al crear el juego.");
  }
};

const updateGame = async (
  gameId: string,
  updates: Partial<Omit<Game, "id" | "created_at">>
): Promise<void> => {
  try {
    const gameRow: Partial<Game> = {
      ...updates,
      updated_at: new Date().toISOString(),
    };
    gameSchema.partial().parse(gameRow);
    await database.update({
      table: "Games",
      columns: Object.keys(gameRow),
      values: [
        {
          id: gameId,
          ...gameRow,
        },
      ],
    });
    logger.info(`Juego actualizado con ID: ${gameId}`);
  } catch (error) {
    logger.error(`Error actualizando juego: ${error}`);
    throw new Error("Error al actualizar el juego.");
  }
};

const deleteGame = async (gameId: string): Promise<void> => {
  try {
    const query = `
      DELETE FROM Games
      WHERE id = @gameId
    `;
    await database.run({
      sql: query,
      params: { gameId },
    });
    logger.info(`Juego eliminado con ID: ${gameId}`);
  } catch (error) {
    logger.error(`Error eliminando juego: ${error}`);
    throw new Error("Error al eliminar el juego.");
  }
};

export { getGameById, getGamesBySeason, createGame, updateGame, deleteGame };
