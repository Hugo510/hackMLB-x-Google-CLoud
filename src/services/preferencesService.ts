import {
  getPreferencesByUserId,
  setPreferences,
  deletePreferences,
} from "../models/spanner/preferencesModel";
import { Preferences } from "../models/spanner/preferencesModel";

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

export const fetchPreferences = async (
  userId: string
): Promise<Preferences[]> => {
  return await getPreferencesByUserId(userId);
};

export const fetchSetPreferences = async (
  userId: string,
  preferencesData: object
): Promise<void> => {
  return await setPreferences(userId, preferencesData);
};

export const fetchDeletePreferences = async (userId: string): Promise<void> => {
  return await deletePreferences(userId);
};
