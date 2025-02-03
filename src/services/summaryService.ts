import {
  getSummariesByUserId,
  getAllSummaries, // <-- nueva importación
  createSummary,
} from "../models/firestore/summariesModel";
import { Summary } from "../models/firestore/summariesModel";
import { Timestamp } from "firebase-admin/firestore";
import {
  extractVideoClip as gcExtractVideoClip,
  generateAudio as gcGenerateAudio,
  translateText as gcTranslateText,
} from "../config/googleCloud";

export const extractVideoClip = gcExtractVideoClip;
export const generateAudio = gcGenerateAudio;
export const translateText = gcTranslateText;

export const fetchSummariesByUserId = async (
  userId: string
): Promise<{ summaries: Summary[]; lastCreatedAt?: Timestamp }> => {
  const result = await getSummariesByUserId(userId);
  return result;
};

// Nueva función para obtener todos los summaries en general
export const fetchAllSummaries = async (): Promise<{
  summaries: Summary[];
  lastCreatedAt?: Timestamp;
}> => {
  const result = await getAllSummaries();
  return result;
};

export const fetchCreateSummary = async (
  summary: Omit<Summary, "id" | "createdAt">
): Promise<void> => {
  return await createSummary(summary);
};

// ...otras funciones si son necesarias...
