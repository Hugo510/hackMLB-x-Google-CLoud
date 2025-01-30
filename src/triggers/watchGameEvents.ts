import { firestore } from "../config/database";
import { publishGameEvent } from "../services/publishGameEvents";
import logger from "../config/logger";

export const watchGameEvents = async (): Promise<void> => {
  firestore.collection("gameEvents").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        const event = change.doc.data();
        logger.info(`Nuevo evento detectado: ${JSON.stringify(event)}`);
        await publishGameEvent(event);
      }
    });
  });
};
