import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    // Puedes agregar más transportes como archivos o servicios externos
    // new transports.File({ filename: 'error.log', level: 'error' }),
    // new transports.File({ filename: 'combined.log' }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    // new transports.File({ filename: 'exceptions.log' }),
  ],
  rejectionHandlers: [
    new transports.Console(),
    // new transports.File({ filename: 'rejections.log' }),
  ],
});

export default logger;
