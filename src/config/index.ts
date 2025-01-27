console.log("Inicializando configuración...");

import Joi from "joi";
/* import { ENV_VARS } from "./env"; */
import { credentials } from "./credentials";
import { appSettings } from "./appSettings";

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  GCLOUD_PROJECT_ID: Joi.string().required(),
  GCLOUD_KEYFILE_PATH: Joi.string().required(),
  SPANNER_INSTANCE_ID: Joi.string().required(),
  SPANNER_DATABASE_ID: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow("").optional(), // Permitir que sea vacío u opcional
  REDIS_DEFAULT_EXPIRATION: Joi.number().default(3600),
  GCLOUD_TASKS_QUEUE: Joi.string().required(),
  GCLOUD_TASKS_LOCATION: Joi.string().required(),
  BASE_URL: Joi.string().required(), // Añadir base URL para uso interno
  PUBSUB_TOPIC_NAME: Joi.string().required(), // Nombre del tema de Pub/Sub para eventos de juego
  PUBSUB_SUBSCRIPTION_NAME: Joi.string().required(), // Nombre de la suscripción de Pub/Sub para procesar eventos
  ENABLE_PUBSUB_PROCESSOR: Joi.boolean().default(false), // Habilitar (true) o deshabilitar (false) el procesador de Pub/Sub
  // ...existing code...
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  PORT: value.PORT || 8080,
  jwtSecret: credentials.jwtSecret,
  gcloudProjectId: value.GCLOUD_PROJECT_ID,
  gcloudKeyfilePath: value.GCLOUD_KEYFILE_PATH,
  spannerInstanceId: value.SPANNER_INSTANCE_ID,
  spannerDatabaseId: value.SPANNER_DATABASE_ID,
  redisHost: value.REDIS_HOST,
  redisPort: value.REDIS_PORT,
  redisPassword: value.REDIS_PASSWORD,
  redisDefaultExpiration: value.REDIS_DEFAULT_EXPIRATION,
  gcloudTasksQueue: value.GCLOUD_TASKS_QUEUE,
  gcloudTasksLocation: value.GCLOUD_TASKS_LOCATION,
  baseUrl: appSettings.baseUrl,
  port: appSettings.port,
  pubsubTopicName: value.PUBSUB_TOPIC_NAME,
  pubsubSubscriptionName: value.PUBSUB_SUBSCRIPTION_NAME,
  enablePubsubProcessor: value.ENABLE_PUBSUB_PROCESSOR,
  // ...mantener otras propiedades existentes...
};
