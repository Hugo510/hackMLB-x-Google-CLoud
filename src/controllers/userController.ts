import { Request, Response } from "express";
import {
  fetchAllUsers,
  fetchUserDetails,
  fetchCreateUser,
  fetchUpdateUser,
  fetchDeleteUser,
  fetchGetUserByEmail,
} from "../services/userService";
import { generateToken } from "../config/auth";
// import redis from "../config/redis"; // Comentar la importación de Redis
import bcrypt from "bcrypt";
import { User } from "../models/spanner/usersModel";
import { body, validationResult } from "express-validator";

// Extender la interfaz Request para incluir la propiedad user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

/**
 * @desc Obtener todos los usuarios
 * @route GET /api/users
 * @access Privado
 * @returns {Array} Lista de usuarios
 */
export const getAllUsersController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

/**
 * @desc Obtener detalles de un usuario por ID
 * @route GET /api/users/:userId
 * @access Privado
 * @param {string} userId - ID del usuario
 * @returns {Object} Detalles del usuario
 */
export const getUserDetailsController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;

    // Verificar si el usuario está en caché
    // const cachedUser = await redis.get(`user:${userId}`);
    // if (cachedUser) {
    //   res.status(200).json(JSON.parse(cachedUser));
    // }

    const user = await fetchUserDetails(userId);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    // Almacenar el usuario en caché
    // await redis.set(`user:${userId}`, JSON.stringify(user), "EX", 60 * 60); // Expira en 1 hora

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};


/**
 * @desc Actualizar un usuario por ID
 * @route PUT /api/users/:userId
 * @access Privado
 * @param {string} userId - ID del usuario
 * @param {Object} updates - Datos a actualizar
 * @returns {Object} Mensaje de éxito
 */
export const updateUserController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    const updates: Partial<Omit<User, "id" | "created_at">> = req.body;
    await fetchUpdateUser(userId, updates);

    // Actualizar el usuario en caché
    const updatedUser = await fetchUserDetails(userId);
    if (updatedUser) {
      // await redis.set(
      //   `user:${userId}`,
      //   JSON.stringify(updatedUser),
      //   "EX",
      //   60 * 60
      // ); // Expira en 1 hora
    }

    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

/**
 * @desc Eliminar un usuario por ID
 * @route DELETE /api/users/:userId
 * @access Privado
 * @param {string} userId - ID del usuario
 * @returns {Object} Mensaje de éxito
 */
export const deleteUserController = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.params;
    await fetchDeleteUser(userId);

    // Eliminar el usuario del caché
    // await redis.del(`user:${userId}`);

    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

// Validators para Signup y Login
const validateSignup = [
  body("name").isString().notEmpty().withMessage("El nombre es obligatorio."),
  body("email").isEmail().withMessage("Formato de correo inválido."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
];

const validateLogin = [
  body("email").isEmail().withMessage("Formato de correo inválido."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres."),
];

export const signup = [
  ...validateSignup,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // Validar entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // No retornamos el Response directamente
      }

      const { name, email, password, age, phone } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await fetchGetUserByEmail(email);
      if (existingUser) {
        res.status(409).json({ message: "El usuario ya está registrado" });
        return; // Evitamos devolver el objeto Response
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el usuario en la base de datos
      const newUser = await fetchCreateUser({
        name,
        email,
        password: hashedPassword,
        status: "active",
        age,
        phone,
      });

      res
        .status(201)
        .json({ message: "Usuario registrado con éxito", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Error al registrar el usuario", error });
    }
  },
];

export const login = [
  ...validateLogin,
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // Validar entrada
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;

      // Buscar el usuario en la base de datos
      const user = await fetchGetUserByEmail(email);
      if (!user) {
        res.status(401).json({ message: "Credenciales inválidas" });
        return;
      }

      // Comparar contraseñas
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Credenciales inválidas" });
        return;
      }

      // Generar token JWT
      const token = generateToken(user!);

      // Almacenar el token en Redis
      // await redis.set(`user:${user.id}:token`, token, "EX", 60 * 60 * 24); // Expira en 24 horas
      console.log('Inicio de Sesion Exitoso')
      res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión", error });
    }
  },
];
