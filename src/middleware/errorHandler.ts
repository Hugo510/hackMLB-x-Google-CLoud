import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

// Middleware de manejo de errores centralizado
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Loguear el error completo
  logger.error(err.stack || err.message || err);

  // Determinar el tipo de error y establecer el código de estado
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(statusCode).json({
    message,
    // Incluir stack trace solo en desarrollo
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
