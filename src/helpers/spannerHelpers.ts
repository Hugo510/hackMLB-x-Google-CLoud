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
    // Convertir el Arreglo resultante a objeto para manejo del schema
    const rowObject = rows[0].reduce((acc: Record<string, any>, column: { name: string; value: any }) => {
      acc[column.name] = column.value;
      return acc;
    }, {});
    return schema.parse(rowObject);
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

    const transformedRows = rows.map((row) => {
    const rowObject: Record<string, unknown> = {};
    row.forEach((column: { name: string; value: unknown }) => {
      rowObject[column.name] = column.value;
    });
    console.log("Usuario tranformados", rowObject)
    return rowObject;
  });

  return transformedRows.map((rowObject) => schema.parse(rowObject));
  } catch (error) {
    logger.error(`Error al ejecutar consulta de múltiples filas: ${error}`);
    throw error;
  }
}
