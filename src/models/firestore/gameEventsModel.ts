import { firestore, database } from "../../config/database";
import logger from "../../config/logger";
import { z } from "zod";
import { FieldValue, Timestamp } from "firebase-admin/firestore"; // Importar FieldValue y Timestamp

// Definir el esquema de validación de eventos de juegos
const gameEventSchema = z.object({
  id: z.string().optional(),
  gameId: z.string(),
  eventType: z.string(),
  timestamp: z.instanceof(Timestamp).optional(), // Usar Timestamp en lugar de Date
  details: z.record(z.any()).optional(),
});

type GameEvent = z.infer<typeof gameEventSchema>;

const getGameEvents = async (
  gameId: string,
  limitEvents = 10
): Promise<GameEvent[]> => {
  try {
    logger.info("gameId", gameId);
    const snapshot = await firestore
      .collection("gameEvents")
      .where("gameId", "==", gameId)
      /* .orderBy("timestamp", "desc") */ // Ordenar por timestamp
      .limit(limitEvents)
      .get();

    if (snapshot.empty) {
      logger.info("La colección 'gameEvents' no existe o está vacía.");
      return [];
    }

    return snapshot.docs.map((doc) => {
      const data = gameEventSchema.parse(doc.data());
      return { id: doc.id, ...data };
    });
  } catch (error) {
    logger.error(`Error obteniendo eventos del juego: ${error}`);
    throw new Error(
      `Error al obtener los eventos del juego: ${(error as Error).message}`
    );
  }
};

const addGameEvent = async (
  event: Omit<GameEvent, "id" | "timestamp">
): Promise<void> => {
  try {
    const eventData = gameEventSchema.parse(event);
    await firestore.collection("gameEvents").add({
      ...eventData,
      timestamp: FieldValue.serverTimestamp(), // Usar serverTimestamp
    });
    logger.info(`Evento de juego añadido para el gameId: ${event.gameId}`);
  } catch (error) {
    logger.error(`Error añadiendo evento de juego: ${error}`);
    throw new Error(
      `Error al añadir el evento de juego: ${(error as Error).message}`
    );
  }
};

export { getGameEvents, addGameEvent, GameEvent };
