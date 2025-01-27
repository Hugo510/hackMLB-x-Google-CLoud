import { Storage } from "@google-cloud/storage";
/* import { Translate } from "@google-cloud/translate/build/src/v2"; */
import { SpeechClient } from "@google-cloud/speech";
import { VideoIntelligenceServiceClient } from "@google-cloud/video-intelligence";
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
/* const translate = createClient(Translate); */
const speechClient = createClient(SpeechClient);
const videoIntelligenceClient = createClient(VideoIntelligenceServiceClient);
const cloudTasksClient = createClient(CloudTasksClient);

/**
 * Cliente de Pub/Sub configurado para el proyecto.
 */
const pubsubClient = new PubSub({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath,
});

export {
  storage,
  /* translate, */ speechClient,
  videoIntelligenceClient,
  cloudTasksClient,
  pubsubClient, // Asegurar que pubsubClient está exportado para uso en otros módulos
};
