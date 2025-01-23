import { Spanner } from "@google-cloud/spanner";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "./index";
import logger from "../config/logger";

const initializeFirebase = () => {
  if (!config.gcloudProjectId || !config.gcloudKeyfilePath) {
    throw new Error(
      "Configuración de Firestore inválida: 'gcloudProjectId' o 'gcloudKeyfilePath' faltante."
    );
  }

  initializeApp({
    credential: cert(config.gcloudKeyfilePath),
  });

  const firestore = getFirestore();

  const verifyFirestoreConnection = async () => {
    try {
      const collections = await firestore.listCollections();
      const collectionNames = collections.map((col) => col.id);
      logger.info("Colecciones en Firestore:", collectionNames);
      if (!collectionNames.includes("gameEvents")) {
        logger.warn("La colección 'gameEvents' no existe en Firestore.");
      } else {
        logger.info("La colección 'gameEvents' está accesible.");
      }
    } catch (error) {
      logger.error("Error listando colecciones de Firestore:", error);
      throw new Error("Error al verificar la conexión con Firestore.");
    }
  };

  verifyFirestoreConnection();

  return firestore;
};

const firestore = initializeFirebase();

const spanner = new Spanner({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath,
});

const instance = spanner.instance(config.spannerInstanceId);
const database = instance.database(config.spannerDatabaseId);

export { spanner, firestore, database };
