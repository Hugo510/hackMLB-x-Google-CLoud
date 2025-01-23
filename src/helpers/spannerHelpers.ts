import { database } from "../config/database";
import { ZodTypeAny, z } from "zod";
import logger from "../config/logger";

export async function runSingleRowQuery<T extends ZodTypeAny>(
  sql: string,
  params: Record<string, unknown>,
  schema: T
): Promise<z.infer<T> | null> {
  try {
    const [rows] = await database.run({ sql, params });
    if (rows.length === 0) {
      return null;
    }
    return schema.parse(rows[0]);
  } catch (error) {
    logger.error(`Error al ejecutar consulta de una fila: ${error}`);
    throw error;
  }
}

export async function runMultipleRowQuery<T extends ZodTypeAny>(
  sql: string,
  params: Record<string, unknown>,
  schema: T
): Promise<z.infer<T>[]> {
  try {
    const [rows] = await database.run({ sql, params });
    return rows.map((row) => schema.parse(row));
  } catch (error) {
    logger.error(`Error al ejecutar consulta de múltiples filas: ${error}`);
    throw error;
  }
}
