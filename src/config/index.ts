import dotenv from "dotenv";
import Joi from "joi";
import { ENV_VARS } from "./env.js";
import {
  storage,
  translate,
  speechClient,
  videoIntelligenceClient,
} from "./googleCloud.js";
import { spanner, firestore, database } from "./database.js";
import { generateToken, verifyToken } from "./auth.js";
import redis from "./redis.js";

dotenv.config();

const envSchema = Joi.object({
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  GCLOUD_PROJECT_ID: Joi.string().required(),
  GCLOUD_KEYFILE: Joi.string().required(),
  SPANNER_INSTANCE_ID: Joi.string().required(),
  SPANNER_DATABASE_ID: Joi.string().required(),
  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().optional(),
  REDIS_DEFAULT_EXPIRATION: Joi.number().default(3600),
  // ...existing code...
}).unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  port: value.PORT,
  jwtSecret: value.JWT_SECRET,
  gcloudProjectId: value.GCLOUD_PROJECT_ID,
  gcloudKeyfile: value.GCLOUD_KEYFILE,
  spannerInstanceId: value.SPANNER_INSTANCE_ID,
  spannerDatabaseId: value.SPANNER_DATABASE_ID,
  redisHost: value.REDIS_HOST,
  redisPort: value.REDIS_PORT,
  redisPassword: value.REDIS_PASSWORD,
  redisDefaultExpiration: value.REDIS_DEFAULT_EXPIRATION,
  // ...existing code...
};

export {
  storage,
  translate,
  speechClient,
  videoIntelligenceClient,
  spanner,
  firestore,
  database,
  generateToken,
  verifyToken,
  redis,
};
