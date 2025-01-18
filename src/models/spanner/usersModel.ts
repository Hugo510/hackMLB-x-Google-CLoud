import { database } from "../../config/database";
import logger from "../../config/logger";
import { z } from "zod";

// Definir el esquema de validación de usuarios
const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  created_at: z.string().optional(),
});

type User = z.infer<typeof userSchema>;

const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const query = `SELECT * FROM Users WHERE id = @userId`;
    const [rows] = await database.run({
      sql: query,
      params: { userId },
    });
    if (rows.length > 0) {
      const user = userSchema.parse(rows[0]);
      return user;
    }
    return null;
  } catch (error) {
    logger.error(`Error obteniendo usuario por ID: ${error}`);
    throw new Error("Error al obtener el usuario.");
  }
};

const createUser = async (user: Omit<User, "created_at">): Promise<void> => {
  try {
    const userRow: User = {
      ...user,
      created_at: new Date().toISOString(),
    };
    userSchema.parse(userRow);
    await database.insert({
      table: "Users",
      columns: ["id", "name", "email", "created_at"],
      values: [userRow],
    });
    logger.info(`Usuario creado con ID: ${user.id}`);
  } catch (error) {
    logger.error(`Error creando usuario: ${error}`);
    throw new Error("Error al crear el usuario.");
  }
};

export { getUserById, createUser };
