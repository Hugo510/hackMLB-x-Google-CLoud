import { Spanner } from "@google-cloud/spanner";
import { Firestore } from "@google-cloud/firestore";
import { config } from "./index";
import logger from "../config/logger";

// Verificar configuración
if (!config.gcloudProjectId || !config.gcloudKeyfilePath) {
  throw new Error(
    "Configuración de Firestore inválida: 'gcloudProjectId' o 'gcloudKeyfilePath' faltante."
  );
}

// Loguear configuración actual
logger.info(`Project ID: ${config.gcloudProjectId}`);
logger.info(`Path al keyfile: ${config.gcloudKeyfilePath}`);

const spanner = new Spanner({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath,
});

const firestore = new Firestore({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath,
});

const instance = spanner.instance(config.spannerInstanceId);
const database = instance.database(config.spannerDatabaseId);

// Función para listar colecciones y verificar 'gameEvents'
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

// Ejecutar la verificación al iniciar
/* verifyFirestoreConnection(); */

export { spanner, firestore, database };
