import { database } from "../../config/database";
import logger from "../../config/logger";
import { z } from "zod";
import {
  runSingleRowQuery,
  runMultipleRowQuery,
} from "../../helpers/spannerHelpers";

// Definir el esquema de validación de usuarios
const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string(),
  created_at: z.string(),
  updated_at: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const query = "SELECT * FROM Users WHERE id = @userId";
    return await runSingleRowQuery(query, { userId }, userSchema);
  } catch (error) {
    logger.error(`Error obteniendo usuario por ID: ${error}`);
    throw new Error("Error al obtener el usuario.");
  }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const query = "SELECT * FROM Users WHERE email = @email";
    return await runSingleRowQuery(query, { email }, userSchema);
  } catch (error) {
    logger.error(`Error obteniendo usuario por email: ${error}`);
    throw new Error("Error al obtener el usuario.");
  }
};

const createUser = async (user: User): Promise<void> => {
  try {
    userSchema.parse(user);
    await database.insert({
      table: "Users",
      columns: ["id", "name", "email", "password", "created_at"],
      values: [user],
    });
    logger.info(`Usuario creado con ID: ${user.id}`);
  } catch (error) {
    logger.error(`Error creando usuario: ${error}`);
    throw new Error("Error al crear el usuario.");
  }
};

const getAllUsers = async (): Promise<User[]> => {
  try {
    const query = "SELECT * FROM Users";
    return await runMultipleRowQuery(query, {}, userSchema);
  } catch (error) {
    logger.error(`Error obteniendo todos los usuarios: ${error}`);
    throw new Error("Error al obtener los usuarios.");
  }
};

const updateUser = async (
  userId: string,
  updates: Partial<Omit<User, "id" | "created_at">>
): Promise<void> => {
  try {
    const userRow: Partial<User> = {
      ...updates,
      updated_at: new Date().toISOString(),
    };
    userSchema.partial().parse(userRow);
    await database.update({
      table: "Users",
      columns: Object.keys(userRow),
      values: [
        {
          id: userId,
          ...userRow,
        },
      ],
    });
    logger.info(`Usuario actualizado con ID: ${userId}`);
  } catch (error) {
    logger.error(`Error actualizando usuario: ${error}`);
    throw new Error("Error al actualizar el usuario.");
  }
};

const deleteUser = async (userId: string): Promise<void> => {
  try {
    const query = `DELETE FROM Users WHERE id = @userId`;
    await database.run({ sql: query, params: { userId } });
    logger.info(`Usuario eliminado con ID: ${userId}`);
  } catch (error) {
    logger.error(`Error eliminando usuario: ${error}`);
    throw new Error("Error al eliminar el usuario.");
  }
};

export {
  getUserById,
  getUserByEmail,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
