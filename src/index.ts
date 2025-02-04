import { loadEnv } from "./config/envLoader";
loadEnv();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import { config } from "./config";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import summaryRoutes from "./routes/summaryRoutes";
import gameEventsRoutes from "./routes/gameEventsRoutes"; // Importar rutas de eventos de juego
import teamsRoutes from "./routes/teamsRoutes"; // Importar rutas de equipos
import mlbStatsRoutes from "./routes/mlbStatsRoutes"; // Importar rutas de MLB Stats
import setupRoutes from "./routes/setupRoutes"; // Importar las rutas de setup
import { errorHandler } from "./middleware/errorHandler";
import rateLimit from "express-rate-limit"; // Importar rateLimit
import { startPubSubProcessor } from "./middleware/pubSubProcessor"; // Importar startPubSubProcessor
import logger from "./config/logger"; // Importar logger configurado
/* import { redis } from "./config/redis"; // Asegurar importación de Redis */

const app = express();

// Agregar esta línea para confiar en el proxy
app.set("trust proxy", 1); // Confía en el primer proxy (por ejemplo, Ngrok)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de peticiones
  message: "Demasiadas peticiones, inténtalo más tarde",
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(compression());
app.use(limiter); // Usar rateLimit

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/summaries", summaryRoutes); // Usar rutas de resúmenes
app.use("/api/game-events", gameEventsRoutes); // Usar rutas de eventos de juego
app.use("/api/mlb-stats", mlbStatsRoutes); // Usar rutas de MLB Stats
app.use("/api/setup", setupRoutes); // Registrar rutas de setup

// Middleware de manejo de errores
app.use(errorHandler);

logger.info("Puerto configurado: " + process.env.PORT);

const port = parseInt(process.env.PORT || "8080", 10);

/**
 * Función asíncrona para iniciar el servidor después de verificar la conexión a Firestore.
 * Inicia el procesador de Pub/Sub si está habilitado en la configuración.
 */
const startServer = async () => {
  try {
    // Verificar la conexión a Firestore realizando una consulta simple
    /* const testSnapshot = await firestore
      .collection("gameEvents")
      .limit(1)
      .get();
    // logger.info("Conexión a Firestore exitosa."); */

    // // Verificar conexión a Redis (descomentar si Redis está habilitado)
    // await redis.ping();
    // logger.info("Conexión a Redis exitosa.");

    app.listen(port, "0.0.0.0", () => {
      logger.info(`Servidor funcionando en el puerto ${port}`);

      // Log adicional inicial
      logger.info("La aplicación ha iniciado correctamente.");

      // Log periódico: cada minuto se registra que la aplicación sigue corriendo.
      setInterval(() => {
        logger.info("La aplicación sigue corriendo...");
      }, 60000);

      if (config.enablePubsubProcessor) {
        // Iniciar procesador de Pub/Sub condicionalmente basado en la configuración
        startPubSubProcessor();
        logger.info("Procesador de Pub/Sub iniciado.");
      } else {
        logger.info("Procesador de Pub/Sub deshabilitado.");
      }
    });
  } catch (error) {
    logger.error("Error al conectar con Firestore o Redis:", error);
    process.exit(1); // Terminar el proceso si la conexión falla
  }
};

// Iniciar la verificación y el servidor
startServer();
