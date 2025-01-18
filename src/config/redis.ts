import { Redis } from "ioredis";
import { config } from "./index";

const redis = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
});

const DEFAULT_EXPIRATION = config.redisDefaultExpiration;

// Función para establecer una clave con expiración
const setWithExpiration = async (key: string, value: string) => {
  try {
    await redis.set(key, value, "EX", DEFAULT_EXPIRATION);
  } catch (err) {
    console.error(`Error al establecer la clave ${key} en Redis:`, err);
    // Manejar el error según sea necesario
  }
};

redis.on("connect", () => {
  console.log("Conectado a Redis");
});

redis.on("error", (err) => {
  console.error("Error en Redis:", err);
});

export default redis;
