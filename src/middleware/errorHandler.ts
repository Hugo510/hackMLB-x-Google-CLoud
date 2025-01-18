import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log del error
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
};
