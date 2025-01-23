import { loadEnv } from "./config/envLoader";
loadEnv();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import winston from "winston";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import summaryRoutes from "./routes/summaryRoutes";
import gameEventsRoutes from "./routes/gameEventsRoutes"; // Importar rutas de eventos de juego
import mlbStatsRoutes from "./routes/mlbStatsRoutes"; // Importar rutas de MLB Stats
import setupRoutes from "./routes/setupRoutes";
import { errorHandler } from "./middleware/errorHandler";
import rateLimit from "express-rate-limit"; // Importar rateLimit
/* import { redis } from "./config/redis"; // Asegurar importación de Redis */

const app = express();

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    // ...agregar transportes de archivos o servicios externos...
  ],
});

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

// Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/summaries", summaryRoutes); // Usar rutas de resúmenes
app.use("/api/game-events", gameEventsRoutes); // Usar rutas de eventos de juego
app.use("/api/mlb-stats", mlbStatsRoutes); // Usar rutas de MLB Stats
app.use("/api/setup", setupRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

const port = process.env.PORT || 8080;

// Función asíncrona para iniciar el servidor después de verificar la conexión a Firestore
const startServer = async () => {
  try {
    // Verificar la conexión a Firestore realizando una consulta simple
    /* const testSnapshot = await firestore
      .collection("gameEvents")
      .limit(1)
      .get();
    logger.info("Conexión a Firestore exitosa."); */

    // // Verificar conexión a Redis (descomentar si Redis está habilitado)
    // await redis.ping();
    // logger.info("Conexión a Redis exitosa.");

    app.listen(port, () => {
      logger.info(`Servidor funcionando en el puerto ${port}`);
    });
  } catch (error) {
    logger.error("Error al conectar con Firestore o Redis:", error);
    process.exit(1); // Terminar el proceso si la conexión falla
  }
};

// Iniciar la verificación y el servidor
startServer();
