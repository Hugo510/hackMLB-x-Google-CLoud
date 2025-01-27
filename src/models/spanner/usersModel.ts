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
  age: z.number().int().positive(),
  phone: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]),
  created_at: z.string().nullable(),
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
    const rows = [
      {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        age: user.age,
        phone: user.phone
      },
    ];
    await database.table("Users").insert(rows);
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
    };
    await database.runTransaction(async (err, transaction) => {
      if (err) {
        console.error("Error al iniciar la transacción:", err);
        return;
      }
      if (!transaction) {
        console.error("Transacción no iniciada correctamente.");
        return;
      }
      const query = {
        columns: ["id", "name", "email", "password", "created_at"],
        keys: [[userId]],
      };

      const results = await transaction.read("Users", query);
      const userData = results[0].map((row: any) => row.toJSON());
      if (!userData.length) {
        throw new Error("Usuario no encontrado");
      }

      // Realiza la actualización en la tabla Users
      await transaction.update("Users", [
        {
          id: userId,
          ...userRow,
        },
      ]);

      await transaction.commit();
      console.log(`Usuario con ID ${userId} actualizado correctamente`);
    });
  } catch (error) {
    logger.error(`Error actualizando usuario: ${error}`);
    throw new Error("Error al actualizar el usuario.");
  }
};

const deleteUser = async (userId: string): Promise<void> => {
  try {
    const userRow = {
      status: "inactive",
    };

    await database.runTransaction(async (err, transaction) => {
      if (err) {
        console.error("Error al iniciar la transacción:", err);
        return;
      }
      if (!transaction) {
        console.error("Transacción no iniciada correctamente.");
        return;
      }
      const query = {
        columns: ["id", "name", "email", "password","status", "created_at"],
        keys: [[userId]],
      };

      const results = await transaction.read("Users", query);
      const userData = results[0].map((row: any) => row.toJSON());
      if (!userData.length) {
        throw new Error("Usuario no encontrado");
      }

      // Realiza la eliminacion en la tabla Users
      await transaction.update("Users", [
        {
          id: userId,
          status: userRow.status,
        },
      ]);
      await transaction.commit();
      console.log(`Usuario con ID ${userId} eliminado correctamente`);
    });
  } catch (error) {
    logger.error(`Error actualizando usuario: ${error}`);
    throw new Error("Error al actualizar el usuario.");
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
