import { Response } from "express";

export function sendErrorResponse(
  res: Response,
  statusCode: number,
  message: string
) {
  res.status(statusCode).json({
    error: {
      code: statusCode,
      message,
    },
  });
}
