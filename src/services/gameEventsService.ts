import {
  getGameEvents,
  addGameEvent,
} from "../models/firestore/gameEventsModel";
import { GameEvent } from "../models/firestore/gameEventsModel";

/**
 * Servicio para obtener eventos de un juego específico
 * @param gameId - ID del juego
 * @returns Lista de eventos del juego
 */
export const fetchGameEvents = async (gameId: string): Promise<GameEvent[]> => {
  const result = await getGameEvents(gameId);
  return result.events;
};

/**
 * Servicio para añadir un nuevo evento a un juego
 * @param event - Datos del evento a añadir
 */
export const fetchAddGameEvent = async (
  event: Omit<GameEvent, "id" | "timestamp">
): Promise<void> => {
  return await addGameEvent(event);
};

// ...otras funciones si son necesarias...
