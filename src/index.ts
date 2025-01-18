import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { config } from "./config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import winston from "winston";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import eventRoutes from "./routes/eventRoutes";
import summaryRoutes from "./routes/summaryRoutes";
import { errorHandler } from "./middleware/errorHandler";

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
app.use("/api/events", eventRoutes);
app.use("/api/summaries", summaryRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Servidor funcionando en el puerto ${config.port}`);
});
