import { database } from "../../config/database";
import logger from "../../config/logger";
import { z } from "zod";
import {
  runSingleRowQuery,
  runMultipleRowQuery,
} from "../../helpers/spannerHelpers";

// Esquema de validación Zod
const teamSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
});

export type Team = z.infer<typeof teamSchema>;

// Esquema para la consulta COUNT(*)
const countSchema = z.object({
  count: z.number(),
});

/**
 * @desc Verificar si la tabla Teams está poblada
 * @returns {Promise<boolean>} Verdadero si está poblada, falso en caso contrario
 */
export const isTeamsTablePopulated = async (): Promise<boolean> => {
  try {
    const query = "SELECT COUNT(*) as count FROM Teams";
    const result = await runSingleRowQuery(query, {}, countSchema);
    return result?.count > 0;
  } catch (error) {
    logger.error(`Error verificando tabla Teams: ${error}`);
    throw new Error("Error al verificar la tabla Teams.");
  }
};

/**
 * @desc Obtener el ID de un equipo por su nombre
 * @param {string} teamName - Nombre del equipo
 * @returns {Promise<string | null>} ID del equipo o null si no existe
 */
export const getTeamIdByName = async (
  teamName: string
): Promise<string | null> => {
  try {
    const query = "SELECT id FROM Teams WHERE name = @teamName";
    const result = await runSingleRowQuery(
      query,
      { teamName },
      teamSchema.partial()
    );
    return result?.id ?? null;
  } catch (error) {
    logger.error(`Error obteniendo ID del equipo ${teamName}: ${error}`);
    throw new Error(`Error al obtener el ID del equipo ${teamName}.`);
  }
};

/**
 * @desc Obtener todos los equipos
 */
export const getAllTeams = async (): Promise<Team[]> => {
  try {
    const query = "SELECT id, name FROM Teams";
    return await runMultipleRowQuery(query, {}, teamSchema);
  } catch (error) {
    logger.error(`Error obteniendo equipos: ${error}`);
    throw new Error("Error al obtener los equipos.");
  }
};

/**
 * @desc Crear un nuevo equipo
 */
export const createTeam = async (team: Team): Promise<void> => {
  try {
    const validatedTeam = teamSchema.parse(team);
    const query = "INSERT INTO Teams (id, name) VALUES (@id, @name)";
    await database.run({
      sql: query,
      params: {
        id: validatedTeam.id,
        name: validatedTeam.name,
      },
    });
  } catch (error) {
    logger.error(`Error creando equipo: ${error}`);
    throw new Error("Error al crear el equipo.");
  }
};

/**
 * @desc Hacer upsert de equipos
 */
export const upsertTeams = async (
  teams: Record<string, string>
): Promise<void> => {
  try {
    const rows = Object.entries(teams).map(([teamName, teamId]) => ({
      id: teamId,
      name: teamName,
    }));

    await database.table("Teams").upsert(rows);
  } catch (error) {
    logger.error(`Error al hacer upsert de equipos: ${error}`);
    throw new Error("Error al actualizar los equipos en la base de datos.");
  }
};
