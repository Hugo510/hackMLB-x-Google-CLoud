import { Storage } from "@google-cloud/storage";
/* import { Translate } from "@google-cloud/translate/build/src/v2"; */
import { SpeechClient } from "@google-cloud/speech";
import { VideoIntelligenceServiceClient } from "@google-cloud/video-intelligence";

const storage = new Storage();
/* const translate = new Translate(); */
const speechClient = new SpeechClient();
const videoIntelligenceClient = new VideoIntelligenceServiceClient();

export { storage, /* translate, */ speechClient, videoIntelligenceClient };
