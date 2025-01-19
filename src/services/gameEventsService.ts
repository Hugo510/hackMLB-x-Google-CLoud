import {
  getGameEvents,
  addGameEvent,
} from "../models/firestore/gameEventsModel";
import { GameEvent } from "../models/firestore/gameEventsModel";

// Obtener eventos de un juego específico
export const fetchGameEvents = async (gameId: string): Promise<GameEvent[]> => {
  try {
    const events = await getGameEvents(gameId);
    return events;
  } catch (error) {
    throw new Error("Error al obtener los eventos del juego.");
  }
};

// Añadir un nuevo evento a un juego
export const fetchAddGameEvent = async (
  event: Omit<GameEvent, "id">
): Promise<void> => {
  try {
    await addGameEvent(event);
  } catch (error) {
    throw new Error("Error al añadir el evento del juego.");
  }
};

// ...otras funciones si son necesarias...
