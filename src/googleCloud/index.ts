import { Storage } from "@google-cloud/storage";
import { v2 as Translate } from "@google-cloud/translate";
import { SpeechClient } from "@google-cloud/speech";
import { VideoIntelligenceServiceClient } from "@google-cloud/video-intelligence";

import { config } from "../config/index";

const storage = new Storage({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath, // Actualizado a gcloudKeyfilePath
});

const translate = new Translate.Translate({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath, // Actualizado a gcloudKeyfilePath
});

const speechClient = new SpeechClient({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath, // Actualizado a gcloudKeyfilePath
});

const videoIntelligenceClient = new VideoIntelligenceServiceClient({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath, // Actualizado a gcloudKeyfilePath
});

export { storage, translate, speechClient, videoIntelligenceClient };
