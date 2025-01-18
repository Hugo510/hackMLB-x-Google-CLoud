import Redis from "ioredis";
import { config } from "./index";

const redis = new Redis({
  host: config.redisHost,
  port: config.redisPort,
  password: config.redisPassword,
});

redis.on("connect", () => {
  console.log("Conectado a Redis");
});

redis.on("error", (err) => {
  console.error("Error en Redis:", err);
});

export default redis;
