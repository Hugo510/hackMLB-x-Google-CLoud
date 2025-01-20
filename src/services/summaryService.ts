import {
  getSummariesByUserId,
  createSummary,
} from "../models/firestore/summariesModel";
import { Summary } from "../models/firestore/summariesModel";

export const fetchSummariesByUserId = async (
  userId: string
): Promise<Summary[]> => {
  return await getSummariesByUserId(userId);
};

export const fetchCreateSummary = async (
  summary: Omit<Summary, "id" | "createdAt">
): Promise<void> => {
  return await createSummary(summary);
};

// ...otras funciones si son necesarias...
