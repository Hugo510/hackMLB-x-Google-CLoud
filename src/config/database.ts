import { Spanner } from "@google-cloud/spanner";
import { Firestore } from "@google-cloud/firestore";
import { config } from "./index";

// Agregar log para verificar que config.gcloudProjectId y config.gcloudKeyfilePath están definidos
/* console.log("gcloudProjectId:", config.gcloudProjectId);
console.log("GCLOUD_KEYFILE_PATH:", config.gcloudKeyfilePath); */

const spanner = new Spanner({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath, // Actualizado a gcloudKeyfilePath
});

const firestore = new Firestore({
  projectId: config.gcloudProjectId,
  keyFilename: config.gcloudKeyfilePath, // Actualizado a gcloudKeyfilePath
});

const instance = spanner.instance(config.spannerInstanceId);
const database = instance.database(config.spannerDatabaseId);

export { spanner, firestore, database };
