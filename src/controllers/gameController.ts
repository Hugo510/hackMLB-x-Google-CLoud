import { Request, Response } from "express";
import {
  fetchGames,
  fetchGameDetails,
  fetchCreateGame,
  fetchUpdateGame,
  fetchDeleteGame,
} from "../services/gameService";
import { Game } from "../models/spanner/gamesModel";

export const getGames = async (req: Request, res: Response): Promise<void> => {
  try {
    const { season } = req.query;
    const games = await fetchGames(season as string);
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los juegos", error });
  }
};

export const getGameDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { gameId } = req.params;
    const game = await fetchGameDetails(gameId);
    if (!game) {
      res.status(404).json({ message: "Juego no encontrado" });
      return;
    }
    res.status(200).json(game);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener detalles del juego", error });
  }
};

export const createGameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const gameData: Omit<Game, "created_at" | "updated_at"> = req.body;
    await fetchCreateGame(gameData);
    res.status(201).json({ message: "Juego creado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el juego", error });
  }
};

export const updateGameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { gameId } = req.params;
    const updates: Partial<Omit<Game, "id" | "created_at">> = req.body;
    await fetchUpdateGame(gameId, updates);
    res.status(200).json({ message: "Juego actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el juego", error });
  }
};

export const deleteGameController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { gameId } = req.params;
    await fetchDeleteGame(gameId);
    res.status(200).json({ message: "Juego eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el juego", error });
  }
};
