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
   // Convertir el Arreglo resultante a objeto para manejo del schema
   const rowObject = rows[0].reduce(
    (acc: Record<string | number, any>, column: { name: string | number; value: any }) => {
      if (typeof column.value === "object" && column.value !== null && "value" in column.value) {
        // Extrae el valor si es un objeto del tipo { value: '...' }
        acc[column.name] = Number((column.value as any).value);
      } 
      return acc;
    },
    {}
  );
  console.log("Fila transformada:", rowObject);
  return schema.parse(rowObject);
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

    const transformedRows = rows.map((row) => {
      const rowObject: Record<string | number, unknown> = {};
      
      row.forEach((column: { name: string; value: unknown }) => {
        rowObject[column.name] = column.value;
      });
      row.forEach((column: { name: string | number; value: unknown }) => {
        if (
          typeof column.value === "object" && column.value !== null && "value" in column.value
        ) {
          // Extrae el valor si es un objeto del tipo { value: '...' }
          rowObject[column.name] = Number((column.value as any).value);
        }
      });
      console.log("Usuario transformado:", rowObject);
      return rowObject;
    });
    // Validación con Zod
    return transformedRows.map((rowObject) => schema.parse(rowObject));
  } catch (error) {
    logger.error(`Error ejecutando consulta de múltiples filas: ${error}`);
    throw error;
  }
};
