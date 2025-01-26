import { database } from "../config/database";
import logger from "../config/logger";
import { ZodType } from "zod";

/**
 * @desc Ejecutar una consulta que retorna una sola fila
 * @param {string} query - Consulta SQL
 * @param {object} params - Parámetros de la consulta
 * @param {ZodType} schema - Esquema de validación Zod
 * @returns {Promise<any | null>} Fila resultante o null
 */
export const runSingleRowQuery = async (
  query: string,
  params: Record<string, any>,
  schema: ZodType
): Promise<any | null> => {
  try {
    const [rows] = await database.run({ sql: query, params });
    if (rows.length === 0) return null;
    return schema.parse(rows[0]);
  } catch (error) {
    logger.error(`Error ejecutando consulta de una sola fila: ${error}`);
    throw error;
  }
};

/**
 * @desc Ejecutar una consulta que retorna múltiples filas
 * @param {string} query - Consulta SQL
 * @param {object} params - Parámetros de la consulta
 * @param {ZodType} schema - Esquema de validación Zod
 * @returns {Promise<any[]>} Lista de filas resultantes
 */
export const runMultipleRowQuery = async (
  query: string,
  params: Record<string, any>,
  schema: ZodType
): Promise<any[]> => {
  try {
    const [rows] = await database.run({ sql: query, params });
    return rows.map((row) => schema.parse(row));
  } catch (error) {
    logger.error(`Error ejecutando consulta de múltiples filas: ${error}`);
    throw error;
  }
};
