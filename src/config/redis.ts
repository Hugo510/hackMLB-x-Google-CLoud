import { Redis } from "ioredis";
import { config } from "./index";
import debug from "debug";

const redisDebug = debug("app:redis");

const redisOptions: any = {
  host: config.redisHost,
  port: config.redisPort,
};

if (config.redisPassword) {
  redisOptions.password = config.redisPassword;
}

// const redis = new Redis(redisOptions); // Comentar la conexión a Redis

const DEFAULT_EXPIRATION = config.redisDefaultExpiration;

// Función para establecer una clave con expiración
const setWithExpiration = async (key: string, value: string) => {
  try {
    // await redis.set(key, value, "EX", DEFAULT_EXPIRATION);
    redisDebug(`Clave ${key} establecida con éxito en Redis`);
  } catch (err) {
    redisDebug(
      `Error al establecer la clave ${key} en Redis: ${(err as Error).message}`
    );
    console.error(`Error al establecer la clave ${key} en Redis:`, err);
    // Manejar el error según sea necesario
  }
};

/*
// redis.on("connect", () => {
//   redisDebug("Conectado a Redis");
//   console.log("Conectado a Redis");
// });

// redis.on("error", (err) => {
//   redisDebug(`Error en Redis: ${err.message}`);
//   console.error("Error en Redis:", err);
// });

// redis.on("reconnecting", () => {
//   redisDebug("Intentando reconectar a Redis...");
//   console.log("Intentando reconectar a Redis...");
// });

// redis.on("end", () => {
//   redisDebug("Conexión a Redis cerrada");
//   console.log("Conexión a Redis cerrada");
// });
*/

export { /* redis, */ setWithExpiration };
