import { Request, Response, NextFunction } from "express";
import {
  fetchGameEvents,
  fetchAddGameEvent,
} from "../services/gameEventsService";
import { GameEvent } from "../models/firestore/gameEventsModel";

/**
 * Controlador para obtener eventos de un juego
 * @param req - Objeto de solicitud
 * @param res - Objeto de respuesta
 * @param next - Función de siguiente middleware
 */
export const getGameEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { gameId } = req.params;
    if (!gameId) {
      res.status(400).json({ message: "El parámetro gameId es obligatorio." });
      return;
    }
    const events = await fetchGameEvents(gameId);
    res.status(200).json(events);
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

/**
 * Controlador para añadir un nuevo evento a un juego
 * @param req - Objeto de solicitud
 * @param res - Objeto de respuesta
 * @param next - Función de siguiente middleware
 */
export const addGameEventController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const event: Omit<GameEvent, "id"> = req.body;
    // Validar que los campos necesarios estén presentes
    if (
      !event.userId ||
      !event.gameId ||
      !event.eventType ||
      !event.details?.playerId ||
      !event.details?.teamId ||
      !event.details?.description
    ) {
      res
        .status(400)
        .json({ message: "Faltan campos requeridos en el evento." });
      return;
    }
    await fetchAddGameEvent(event);
    res.status(201).json({ message: "Evento añadido exitosamente" });
  } catch (error) {
    next(error); // Pasar el error al middleware de manejo de errores
  }
};

// ...otras funciones si son necesarias...
