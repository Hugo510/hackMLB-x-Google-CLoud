import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/auth";
import redis from "../config/redis";

// Extender la interfaz Request para incluir la propiedad user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Autenticación requerida" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = verifyToken(token);

    // Verificar si el token existe en Redis
    const storedToken = await redis.get(`user:${decoded.id}:token`);
    if (storedToken !== token) {
      res.status(401).json({ message: "Token inválido o expirado" });
      return;
    }

    // Adjuntar información del usuario a la solicitud
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ message: "Autenticación fallida", error });
  }
};
