import { Spanner } from "@google-cloud/spanner";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { config } from "./index";
import logger from "../config/logger";

const getFirebaseCredentials = async () => {
  try {
    // Crear cliente de Secret Manager con credenciales explícitas
    const client = new SecretManagerServiceClient({
      keyFilename: config.gcloudKeyfilePath,
    });

    const name = `projects/${config.gcloudProjectId}/secrets/hackmlb-keyfile/versions/1`;

    const [version] = await client.accessSecretVersion({ name });
    const credentials = version.payload?.data?.toString() || "";

    // Crear archivo temporal
    const tempPath = join(tmpdir(), `firebase-credentials-${Date.now()}.json`);
    writeFileSync(tempPath, credentials);

    return tempPath;
  } catch (error) {
    logger.error("Error obteniendo credenciales desde Secret Manager:", error);
    // Si falla Secret Manager, usar el archivo local como fallback
    logger.info("Usando archivo de credenciales local como fallback");
    return config.gcloudKeyfilePath;
  }
};

const initializeFirebase = async () => {
  if (!config.gcloudProjectId) {
    throw new Error(
      "Configuración de Firestore inválida: 'gcloudProjectId' faltante."
    );
  }

  let tempCredPath: string | null = null;

  try {
    tempCredPath = await getFirebaseCredentials();

    if (!tempCredPath) {
      throw new Error("No se pudieron obtener las credenciales de Firebase");
    }

    initializeApp({
      credential: cert(tempCredPath),
    });

    return getFirestore();
  } catch (error) {
    logger.error("Error inicializando Firebase:", error);
    throw error;
  } finally {
    // Eliminar el archivo temporal si existe
    if (tempCredPath) {
      try {
        unlinkSync(tempCredPath);
        logger.info("Archivo de credenciales temporal eliminado");
      } catch (unlinkError) {
        logger.error("Error eliminando archivo temporal:", unlinkError);
      }
    }
  }
};

// Inicializar Firestore de manera asíncrona
let firestore: any = null;

initializeFirebase()
  .then((fs) => {
    firestore = fs;
    logger.info("Firestore inicializado correctamente");
  })
  .catch((error) => {
    logger.error("Error fatal inicializando Firestore:", error);
    process.exit(1);
  });

const spanner = new Spanner({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath,
});

const instance = spanner.instance(config.spannerInstanceId);
const database = instance.database(config.spannerDatabaseId);

export { spanner, firestore, database };
