import { Request, Response } from "express";
import {
  extractVideoClip,
  generateAudio,
  translateText,
  fetchSummariesByUserId, // para obtener summaries por usuario
  fetchAllSummaries, // para obtener todos los summaries
} from "../services/summaryService";
import { addGameEvent } from "../models/firestore/gameEventsModel";
import logger from "../config/logger";

export const generateSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  logger.info(`generateSummary called with body: ${JSON.stringify(req.body)}`);
  try {
    logger.info("Validating required fields.");
    // Validar campos requeridos
    if (!req.body?.gameId || !req.body?.eventType || !req.body?.details) {
      res.status(400).json({
        error:
          "Request body is missing required fields (gameId, eventType, details).",
      });
      return;
    }

    const { gameId, eventType, timestamp, details } = req.body;

    // Validar propiedades dentro de details
    if (
      !details.videoUri ||
      details.startTime == null ||
      details.endTime == null
    ) {
      res.status(400).json({
        error: "Details must include videoUri, startTime, and endTime.",
      });
      return;
    }

    const inputVideoUri = details.videoUri;
    const startTime = details.startTime;
    const endTime = details.endTime;

    const outputVideoUri = `${gameId}_${eventType}_clip.mp4`;
    logger.info(
      `Video clip extraction requested: input=${details.videoUri}, output=${outputVideoUri}`
    );
    await extractVideoClip(inputVideoUri, outputVideoUri, startTime, endTime);

    const description = `A ${eventType} occurred in the game ${gameId}.`;
    logger.info("Translating text for ES and JA.");
    const [translatedES, translatedJA] = await Promise.all([
      translateText(description, "es"),
      translateText(description, "ja"),
    ]);

    const audioUris = [
      {
        uri: `${gameId}_${eventType}_en.mp3`,
        text: description,
        languageCode: "en-US",
      },
      {
        uri: `${gameId}_${eventType}_es.mp3`,
        text: translatedES,
        languageCode: "es-ES",
      },
      {
        uri: `${gameId}_${eventType}_ja.mp3`,
        text: translatedJA,
        languageCode: "ja-JP",
      },
    ];

    logger.info("Generating audio for each translation.");
    await Promise.all(
      audioUris.map((audio) =>
        generateAudio(audio.text, audio.languageCode, "NEUTRAL", audio.uri)
      )
    );

    logger.info(
      `Adding game event in Firestore for gameId=${gameId} with eventType=${eventType}.`
    );
    await addGameEvent({
      gameId,
      eventType,
      userId: req.user?.id || "system",
      details: {
        videoUri: outputVideoUri,
        description: description,
        audioUris,
      },
    });

    logger.info("Summary generated successfully.");
    res.status(200).json({ message: "Summary generated successfully." });
  } catch (error) {
    logger.error("Error generating summary:", {
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
    });
    res.status(500).json({ error: "Error generating summary." });
  }
};

// Obtener summaries de un usuario específico
export const getSummaries = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Priorizar el id obtenido de los parámetros de la ruta
  const userId = req.params.userId || req.user?.id;
  if (!userId || typeof userId !== "string") {
    res.status(400).json({ error: "Falta el campo 'userId'." });
    return;
  }
  try {
    const result = await fetchSummariesByUserId(userId);
    res.status(200).json(result);
  } catch (error) {
    logger.error("Error al obtener summaries por usuario:", error);
    res.status(500).json({ error: "Error al obtener summaries por usuario." });
  }
};

// Obtener todos los summaries generales
export const getAllSummaries = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await fetchAllSummaries();
    res.status(200).json(result);
  } catch (error) {
    logger.error("Error al obtener todos los summaries:", error);
    res.status(500).json({ error: "Error al obtener todos los summaries." });
  }
};
