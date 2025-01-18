import jwt from "jsonwebtoken";

interface User {
  id: string;
  email: string;
}

const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" } // Token válido por 7 días
  );
};

const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export { generateToken, verifyToken };
