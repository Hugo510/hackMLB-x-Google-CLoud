import { Request, Response, NextFunction } from "express";
import {
  fetchGames,
  fetchGameDetails,
  fetchCreateGame,
  fetchUpdateGame,
  fetchDeleteGame,
} from "../services/gameService";
import { Game } from "../models/spanner/gamesModel";

export const getGames = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { season } = req.query;
    if (!season) {
      res.status(400).json({ message: "El parámetro season es obligatorio." });
      return;
    }
    const games = await fetchGames(season as string);
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

export const getGameDetails = async (
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
    const game = await fetchGameDetails(gameId);
    if (!game) {
      res.status(404).json({ message: "Juego no encontrado" });
      return;
    }
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

export const createGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const gameData: Omit<Game, "created_at" | "updated_at"> = req.body;
    // Validar que los campos necesarios estén presentes
    if (
      !gameData.home_team_id ||
      !gameData.away_team_id ||
      !gameData.date ||
      !gameData.venue ||
      !gameData.season
    ) {
      res
        .status(400)
        .json({ message: "Faltan campos requeridos en el juego." });
      return;
    }
    await fetchCreateGame(gameData);
    res.status(201).json({ message: "Juego creado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const updateGameController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { gameId } = req.params;
    const updates: Partial<Omit<Game, "id" | "created_at">> = req.body;
    if (!gameId) {
      res.status(400).json({ message: "El parámetro gameId es obligatorio." });
      return;
    }
    await fetchUpdateGame(gameId, updates);
    res.status(200).json({ message: "Juego actualizado exitosamente" });
  } catch (error) {
    next(error);
  }
};

export const deleteGameController = async (
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
    await fetchDeleteGame(gameId);
    res.status(200).json({ message: "Juego eliminado exitosamente" });
  } catch (error) {
    next(error);
  }
};
