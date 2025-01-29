import { Request, Response } from "express";
import "../types/express"; // Asegurarse de importar los tipos personalizados
import {
  extractVideoClip,
  generateAudio,
  translateText,
} from "../services/summaryService";
import { addGameEvent } from "../models/firestore/gameEventsModel";

export const generateSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { gameId, eventType, timestamp, details } = req.body;
    const inputVideoUri = details.videoUri;
    const startTime = details.startTime;
    const endTime = details.endTime;

    const outputVideoUri = `${gameId}_${eventType}_clip.mp4`;
    await extractVideoClip(inputVideoUri, outputVideoUri, startTime, endTime);

    const description = `A ${eventType} occurred in the game ${gameId}.`;
    const translatedDescriptions = await Promise.all([
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
        text: translatedDescriptions[0],
        languageCode: "es-ES",
      },
      {
        uri: `${gameId}_${eventType}_ja.mp3`,
        text: translatedDescriptions[1],
        languageCode: "ja-JP",
      },
    ];

    await Promise.all(
      audioUris.map((audio) =>
        generateAudio(audio.text, audio.languageCode, "NEUTRAL", audio.uri)
      )
    );

    await addGameEvent({
      gameId,
      eventType,
      userId: req.user?.id || "system", // Asumiendo que tienes el usuario en el request
      details: {
        videoUri: outputVideoUri,
        description: description,
        audioUris: audioUris.map(({ uri, text, languageCode }) => ({
          uri,
          text,
          languageCode,
        })),
      },
    });

    res.status(200).send({ message: "Summary generated successfully." });
  } catch (error) {
    console.error(`Error generating summary: ${(error as Error).message}`);
    res.status(500).send({ error: "Error generating summary." });
  }
};
