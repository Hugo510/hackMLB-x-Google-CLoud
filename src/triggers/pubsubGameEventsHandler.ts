import { PubSub } from "@google-cloud/pubsub";
import { extractVideoClip } from "../services/summaryService";
import { generateAudio } from "../services/summaryService";
import { translateText } from "../services/summaryService";
import { addGameEvent } from "../models/firestore/gameEventsModel";

const pubsub = new PubSub();
const subscriptionName = "game-events-subscription";

const processGameEvent = async (message: any) => {
  const event = JSON.parse(message.data.toString());
  console.log("Procesando evento:", event);

  const { gameId, eventType, details } = event;
  const { videoUri, startTime, endTime } = details;

  // 1️⃣ Generar clip de video
  const outputVideoUri = `gs://mlb-summaries-bucket/videos/${gameId}_${eventType}.mp4`;
  await extractVideoClip(videoUri, outputVideoUri, startTime, endTime);

  // 2️⃣ Generar descripción
  const description = `A ${eventType} occurred in the game ${gameId}.`;

  // 3️⃣ Traducir descripción
  const [descES, descJA] = await Promise.all([
    translateText(description, "es"),
    translateText(description, "ja"),
  ]);

  // 4️⃣ Generar audio
  const audioUris = [
    {
      uri: `gs://mlb-summaries-bucket/audio/${gameId}_${eventType}_en.mp3`,
      text: description,
      languageCode: "en-US",
    },
    {
      uri: `gs://mlb-summaries-bucket/audio/${gameId}_${eventType}_es.mp3`,
      text: descES,
      languageCode: "es-ES",
    },
    {
      uri: `gs://mlb-summaries-bucket/audio/${gameId}_${eventType}_ja.mp3`,
      text: descJA,
      languageCode: "ja-JP",
    },
  ];

  await Promise.all(
    audioUris.map((audio) =>
      generateAudio(audio.text, audio.languageCode, "NEUTRAL", audio.uri)
    )
  );

  // 5️⃣ Guardar en Firestore
  await addGameEvent({
    gameId,
    eventType,
    userId: event.userId,
    details: {
      videoUri: outputVideoUri,
      audioUris,
    },
  });

  message.ack(); // Confirmar procesamiento en Pub/Sub
};

pubsub.subscription(subscriptionName).on("message", processGameEvent);
