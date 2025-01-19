import dotenvSafe from "dotenv-safe";
dotenvSafe.config({
  allowEmptyValues: true,
});

import express from "express";
import { config } from "./config/index";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import winston from "winston";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import summaryRoutes from "./routes/summaryRoutes";
import gameEventsRoutes from "./routes/gameEventsRoutes"; // Importar rutas de eventos de juego
import summariesRoutes from "./routes/summaryRoutes"; // Importar rutas de resúmenes
import { errorHandler } from "./middleware/errorHandler";
import { firestore } from "./config/database"; // Importar Firestore

const app = express();

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    // ...agregar transportes de archivos o servicios externos...
  ],
});

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(compression());

// Rutas principales
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/summaries", summaryRoutes); // Usar rutas de resúmenes
app.use("/api/game-events", gameEventsRoutes); // Usar rutas de eventos de juego

// Ruta de prueba para listar colecciones
app.get("/test/firestore", async (req, res) => {
  try {
    const collections = await firestore.listCollections();
    const collectionNames = collections.map((col) => col.id);
    res.status(200).json({ collections: collectionNames });
  } catch (error) {
    logger.error("Error listando colecciones de Firestore:", error);
    res
      .status(500)
      .json({ message: "Error al listar colecciones de Firestore.", error });
  }
});

// Middleware de manejo de errores
app.use(errorHandler);

// Función asíncrona para iniciar el servidor después de verificar la conexión a Firestore
const startServer = async () => {
  try {
    // Verificar la conexión a Firestore realizando una consulta simple
    /* const testSnapshot = await firestore
      .collection("gameEvents")
      .limit(1)
      .get();
    logger.info("Conexión a Firestore exitosa."); */

    app.listen(config.port, () => {
      logger.info(`Servidor funcionando en el puerto ${config.port}`);
    });
  } catch (error) {
    logger.error("Error al conectar con Firestore:", error);
    process.exit(1); // Terminar el proceso si la conexión falla
  }
};

// Iniciar la verificación y el servidor
startServer();
