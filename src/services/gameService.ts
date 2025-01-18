import {
  getGamesBySeason,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../models/spanner/gamesModel";
import { Game } from "../models/spanner/gamesModel";

export const fetchGames = async (season: string): Promise<Game[]> => {
  return await getGamesBySeason(season);
};

export const fetchGameDetails = async (
  gameId: string
): Promise<Game | null> => {
  return await getGameById(gameId);
};

export const fetchCreateGame = async (
  gameData: Omit<Game, "created_at" | "updated_at">
): Promise<void> => {
  return await createGame(gameData);
};

export const fetchUpdateGame = async (
  gameId: string,
  updates: Partial<Omit<Game, "id" | "created_at">>
): Promise<void> => {
  return await updateGame(gameId, updates);
};

export const fetchDeleteGame = async (gameId: string): Promise<void> => {
  return await deleteGame(gameId);
};
