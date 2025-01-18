// ...existing code...
export const ENV_VARS = {
  JWT_SECRET: process.env.JWT_SECRET || "change_me",
  GCLOUD_PROJECT_ID: process.env.GCLOUD_PROJECT_ID || "my-gcloud-project",
  GCLOUD_KEYFILE: process.env.GCLOUD_KEYFILE || "path/to/service-account.json",
  SPANNER_INSTANCE_ID: process.env.SPANNER_INSTANCE_ID || "my-spanner-instance",
  SPANNER_DATABASE_ID: process.env.SPANNER_DATABASE_ID || "my-spanner-database",
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
  // ...existing code...
};
