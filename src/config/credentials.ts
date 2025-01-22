import dotenvSafe from "dotenv-safe";

dotenvSafe.config({
  allowEmptyValues: true,
});

export const credentials = {
  jwtSecret: process.env.JWT_SECRET || "",
  // ...agregar claves adicionales si se requiere...
};
