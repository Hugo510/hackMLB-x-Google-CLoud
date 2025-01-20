import { Spanner } from "@google-cloud/spanner";

// Importar Firebase Admin SDK
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "./index";
import logger from "../config/logger";

// Verificar configuración
if (!config.gcloudProjectId || !config.gcloudKeyfilePath) {
  throw new Error(
    "Configuración de Firestore inválida: 'gcloudProjectId' o 'gcloudKeyfilePath' faltante."
  );
}

// Loguear configuración actual
/* logger.info(`Project ID: ${config.gcloudProjectId}`);
logger.info(`Path al keyfile: ${config.gcloudKeyfilePath}`); */

const spanner = new Spanner({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath,
});

const instance = spanner.instance(config.spannerInstanceId);
const database = instance.database(config.spannerDatabaseId);

// Inicializar la aplicación de Firebase
initializeApp({
  credential: cert(config.gcloudKeyfilePath),
});

// Obtener una instancia de Firestore
const firestore = getFirestore();

// Función para listar colecciones y verificar 'gameEvents'
const verifyFirestoreConnection = async () => {
  try {
    const collections = await firestore.listCollections();
    interface Collection {
      id: string;
    }

    const collectionNames: string[] = collections.map(
      (col: Collection) => col.id
    );
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
