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
      // Eliminar cualquier filtrado para devolver todos los documentos
      .get();

    if (snapshot.empty) {
      logger.info(
        "La colección 'gameEvents' no existe o está vacía. Creando documento placeholder..."
      );
      console.log(`No se encontraron eventos para gameId: ${gameId}`);
      await firestore.collection("gameEvents").add({
        gameId: "placeholder",
        eventType: "placeholder",
        timestamp: new Date(),
        details: { placeholder: true },
      });
      // Reintentar la consulta después de crear el documento
      return []; // o relanzar la consulta si deseas obtener los nuevos documentos
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

const addGameEvent = async (event: Omit<GameEvent, "id">): Promise<void> => {
  try {
    const eventData = gameEventSchema.parse(event);
    await firestore.collection("gameEvents").add(eventData);
    logger.info(`Evento de juego añadido para el gameId: ${event.gameId}`);
  } catch (error) {
    logger.error(`Error añadiendo evento de juego: ${error}`);
    throw new Error(
      `Error al añadir el evento de juego: ${(error as Error).message}`
    );
  }
};

export { getGameEvents, addGameEvent, GameEvent }; // Exportar GameEvent
