import { firestore } from "../../config/database";
import logger from "../../config/logger";
import { z } from "zod";

// Definir el esquema de validación de resúmenes
const summarySchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  content: z.string(),
  created_at: z.date(),
});

type Summary = z.infer<typeof summarySchema>;

const getSummariesByUserId = async (userId: string): Promise<Summary[]> => {
  try {
    const snapshot = await firestore
      .collection("summaries")
      .where("userId", "==", userId)
      .get();

    return snapshot.docs.map((doc) => {
      const data = summarySchema.parse(doc.data());
      return { id: doc.id, ...data };
    });
  } catch (error) {
    logger.error(`Error obteniendo resúmenes del usuario: ${error}`);
    throw new Error("Error al obtener los resúmenes del usuario.");
  }
};

const createSummary = async (
  summary: Omit<Summary, "id" | "created_at">
): Promise<void> => {
  try {
    const summaryData: Summary = {
      ...summary,
      created_at: new Date(),
    };
    summarySchema.parse(summaryData);
    await firestore.collection("summaries").add(summaryData);
    logger.info(`Resumen creado para el usuario ID: ${summary.userId}`);
  } catch (error) {
    logger.error(`Error creando resumen: ${error}`);
    throw new Error("Error al crear el resumen.");
  }
};

export { getSummariesByUserId, createSummary };
