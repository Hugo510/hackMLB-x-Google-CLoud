import { Spanner } from "@google-cloud/spanner";
import { Firestore } from "@google-cloud/firestore";
import { config } from "./index.js";

const spanner = new Spanner({
  projectId: config.gcloudProjectId,
});

const firestore = new Firestore();

const instance = spanner.instance(config.spannerInstanceId);
const database = instance.database(config.spannerDatabaseId);

export { spanner, firestore, database };
