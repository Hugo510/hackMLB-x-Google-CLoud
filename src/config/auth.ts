import jwt from "jsonwebtoken";
import { User } from "../models/spanner/usersModel";

interface TokenPayload {
  id: string;
  email: string;
}

const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email } as TokenPayload,
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" } // Token válido por 24 horas
  );
};

const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
};

export { generateToken, verifyToken };
