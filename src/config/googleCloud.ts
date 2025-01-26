import { Storage } from "@google-cloud/storage";
/* import { Translate } from "@google-cloud/translate/build/src/v2"; */
import { SpeechClient } from "@google-cloud/speech";
import { VideoIntelligenceServiceClient } from "@google-cloud/video-intelligence";
import { CloudTasksClient } from "@google-cloud/tasks";
import logger from "./logger";
import { config } from "./index";

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

export {
  storage,
  /* translate, */ speechClient,
  videoIntelligenceClient,
  cloudTasksClient,
};
