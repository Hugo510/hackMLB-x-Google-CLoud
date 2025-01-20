import {
  getGameEvents,
  addGameEvent,
} from "../models/firestore/gameEventsModel";
import { GameEvent } from "../models/firestore/gameEventsModel";

// Obtener eventos de un juego específico
export const fetchGameEvents = async (gameId: string): Promise<GameEvent[]> => {
  const result = await getGameEvents(gameId);
  return result.events;
};

// Añadir un nuevo evento a un juego
export const fetchAddGameEvent = async (
  event: Omit<GameEvent, "id" | "timestamp">
): Promise<void> => {
  return await addGameEvent(event);
};

// ...otras funciones si son necesarias...
