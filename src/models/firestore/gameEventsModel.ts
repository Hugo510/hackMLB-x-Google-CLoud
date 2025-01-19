import { firestore } from "../../config/database";
import logger from "../../config/logger";
import { z } from "zod";

// Definir el esquema de validación de eventos de juegos
const gameEventSchema = z.object({
  id: z.string().optional(),
  gameId: z.string(),
  eventType: z.string(),
  timestamp: z.date(),
  details: z.record(z.any()),
});

type GameEvent = z.infer<typeof gameEventSchema>;

const getGameEvents = async (gameId: string): Promise<GameEvent[]> => {
  try {
    const snapshot = await firestore
      .collection("gameEvents")
      .where("gameId", "==", gameId)
      .get();

    return snapshot.docs.map((doc) => {
      const data = gameEventSchema.parse(doc.data());
      return { id: doc.id, ...data };
    });
  } catch (error) {
    logger.error(`Error obteniendo eventos del juego: ${error}`);
    throw new Error("Error al obtener los eventos del juego.");
  }
};

const addGameEvent = async (event: Omit<GameEvent, "id">): Promise<void> => {
  try {
    const eventData = gameEventSchema.parse(event);
    await firestore.collection("gameEvents").add(eventData);
    logger.info(`Evento de juego añadido para el gameId: ${event.gameId}`);
  } catch (error) {
    logger.error(`Error añadiendo evento de juego: ${error}`);
    throw new Error(`Error al añadir el evento de juego.`);
  }
};

export { getGameEvents, addGameEvent, GameEvent }; // Exportar GameEvent
