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
  limitEvents = 10,
  lastTimestamp?: Timestamp
): Promise<{ events: GameEvent[]; lastTimestamp?: Timestamp }> => {
  try {
    let query = firestore
      .collection("gameEvents")
      .where("gameId", "==", gameId)
      /* .orderBy("timestamp", "desc") */
      .limit(limitEvents);

    if (lastTimestamp) {
      query = query.startAfter(lastTimestamp);
    }

    const snapshot = await query.get();

    if (snapshot.empty) {
      logger.info("La colección 'gameEvents' no existe o está vacía.");
      return { events: [] };
    }

    const events: GameEvent[] = snapshot.docs.map((doc) => {
      const data = gameEventSchema.parse(doc.data());
      return {
        id: doc.id,
        gameId: data.gameId,
        eventType: data.eventType,
        timestamp: data.timestamp,
        details: data.details,
      };
    });

    const lastDoc = snapshot.docs[snapshot.docs.length - 1];
    const newLastTimestamp = lastDoc.get("timestamp") as Timestamp;

    return { events, lastTimestamp: newLastTimestamp };
  } catch (error: any) {
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
