import { firestore } from "../../config/database";
import logger from "../../config/logger";
import { z } from "zod";
import { FieldValue, Timestamp } from "firebase-admin/firestore"; // Importar FieldValue y Timestamp

// Definir el esquema de validación de resúmenes
const summarySchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  content: z.string(),
  createdAt: z.instanceof(Timestamp).optional(), // Usar Timestamp en lugar de Date
});

type Summary = z.infer<typeof summarySchema>;

const getSummariesByUserId = async (
  userId: string,
  limitSummaries = 10,
  lastCreatedAt?: Timestamp
): Promise<{ summaries: Summary[]; lastCreatedAt?: Timestamp }> => {
  try {
    let query = firestore
      .collection("summaries")
      .where("userId", "==", userId)
      /* .orderBy("createdAt", "desc") */
      .limit(limitSummaries);

    if (lastCreatedAt) {
      query = query.startAfter(lastCreatedAt);
    }

    const snapshot = await query.get();

    const summaries: Summary[] = snapshot.docs.map((doc) => {
      const data = summarySchema.parse(doc.data());
      return {
        id: doc.id,
        userId: data.userId,
        content: data.content,
        createdAt: data.createdAt,
      };
    });

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    const newLastCreatedAt = lastDoc.get("createdAt") as Timestamp;

    return { summaries, lastCreatedAt: newLastCreatedAt };
  } catch (error) {
    logger.error(`Error obteniendo resúmenes del usuario: ${error}`);
    throw new Error("Error al obtener los resúmenes del usuario.");
  }
};

const getAllSummaries = async (
  limitSummaries = 10,
  lastCreatedAt?: Timestamp
): Promise<{ summaries: Summary[]; lastCreatedAt?: Timestamp }> => {
  try {
    let query = firestore
      .collection("summaries")
      // ...posible orderBy si se requiere...
      .limit(limitSummaries);

    if (lastCreatedAt) {
      query = query.startAfter(lastCreatedAt);
    }

    const snapshot = await query.get();

    const summaries: Summary[] = snapshot.docs.map((doc) => {
      const data = summarySchema.parse(doc.data());
      return {
        id: doc.id,
        userId: data.userId,
        content: data.content,
        createdAt: data.createdAt,
      };
    });

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    const newLastCreatedAt = lastDoc?.get("createdAt") as Timestamp;

    return { summaries, lastCreatedAt: newLastCreatedAt };
  } catch (error) {
    logger.error(`Error obteniendo todos los summaries: ${error}`);
    throw new Error("Error al obtener todos los summaries.");
  }
};

const createSummary = async (
  summary: Omit<Summary, "id" | "createdAt">
): Promise<void> => {
  try {
    const summaryData = summarySchema.parse(summary);
    await firestore.collection("summaries").add({
      ...summaryData,
      createdAt: FieldValue.serverTimestamp(), // Usar serverTimestamp
    });
    logger.info(`Resumen creado para el usuario ID: ${summary.userId}`);
  } catch (error) {
    logger.error(`Error creando resumen: ${error}`);
    throw new Error("Error al crear el resumen.");
  }
};

export { getSummariesByUserId, getAllSummaries, createSummary, Summary }; // Exportar Summary
