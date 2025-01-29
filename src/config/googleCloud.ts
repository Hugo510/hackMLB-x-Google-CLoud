import { Storage } from "@google-cloud/storage";
import { SpeechClient } from "@google-cloud/speech";
import { VideoIntelligenceServiceClient } from "@google-cloud/video-intelligence";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { TranslationServiceClient } from "@google-cloud/translate";
import { CloudTasksClient } from "@google-cloud/tasks";
import { PubSub } from "@google-cloud/pubsub";
import logger from "./logger";
import { config } from "./index";

/**
 * Crea una instancia del cliente de Google Cloud especificado.
 *
 * @param ClientClass - Clase del cliente de Google Cloud a instanciar.
 * @returns Instancia del cliente de Google Cloud.
 * @throws {Error} Si la configuración es inválida.
 */
const createClient = (ClientClass: any) => {
  if (!config) {
    throw new Error(
      "Configuración de Google Cloud inválida: 'gcloudProjectId' o 'gcloudKeyfilePath' faltante."
    );
  }
  logger.log("Creando cliente con configuración:", config);
  return new ClientClass({
    projectId: config.gcloudProjectId,
    keyFilename: config.gcloudKeyfilePath,
  });
};

const storage = createClient(Storage);
// const translate = createClient(Translate);
const speechClient = createClient(SpeechClient);
const videoIntelligenceClient = createClient(VideoIntelligenceServiceClient);
const textToSpeechClient = createClient(TextToSpeechClient);
const translationServiceClient = createClient(TranslationServiceClient);
const cloudTasksClient = createClient(CloudTasksClient);

/**
 * Cliente de Pub/Sub configurado para el proyecto.
 */
const pubsubClient = new PubSub({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath,
});

/**
 * Extrae un clip de video utilizando la Video Intelligence API.
 *
 * @param inputUri - URI del video de entrada.
 * @param outputUri - URI del video de salida.
 * @param startTime - Tiempo de inicio del clip en segundos.
 * @param endTime - Tiempo de fin del clip en segundos.
 * @returns Promesa que se resuelve cuando el clip ha sido procesado y subido.
 * @throws {Error} Si ocurre un error durante el procesamiento del video.
 */
export const extractVideoClip = async (
  inputUri: string,
  outputUri: string,
  startTime: number,
  endTime: number
): Promise<void> => {
  try {
    const request = {
      inputUri,
      features: ["SHOT_CHANGE_DETECTION"],
      videoContext: {
        segments: [
          {
            startTimeOffset: { seconds: startTime },
            endTimeOffset: { seconds: endTime },
          },
        ],
      },
    };

    const [operation] = await videoIntelligenceClient.annotateVideo(request);
    const [result] = await operation.promise();

    await storage.bucket("mlb-summaries-bucket").upload(outputUri, {
      destination: `videos/${outputUri}`,
    });
  } catch (error) {
    throw new Error("Error processing video clip.");
  }
};

export const generateAudio = async (
  text: string,
  languageCode: string,
  gender: "MALE" | "FEMALE" | "NEUTRAL",
  outputUri: string
): Promise<void> => {
  try {
    const request = {
      input: { text },
      voice: { languageCode, ssmlGender: gender },
      audioConfig: { audioEncoding: "MP3" },
    };

    const [response] = await textToSpeechClient.synthesizeSpeech(request);
    const file = storage
      .bucket("mlb-summaries-bucket")
      .file(`audio/${outputUri}`);
    await file.save(response.audioContent as Buffer);
  } catch (error) {
    throw new Error("Error generating audio.");
  }
};

export const translateText = async (
  text: string,
  targetLanguage: string
): Promise<string> => {
  try {
    const request = {
      parent: `projects/${process.env.GCP_PROJECT_ID}/locations/global`,
      contents: [text],
      mimeType: "text/plain",
      targetLanguageCode: targetLanguage,
    };
    const [response] = await translationServiceClient.translateText(request);
    return response.translations[0].translatedText;
  } catch (error) {
    console.error(`Error translating text: ${(error as Error).message}`);
    throw new Error("Error translating text.");
  }
};

export {
  storage,
  // translate,
  speechClient,
  videoIntelligenceClient,
  textToSpeechClient,
  translationServiceClient,
  cloudTasksClient,
  pubsubClient, // Asegurar que pubsubClient está exportado para uso en otros módulos
};
