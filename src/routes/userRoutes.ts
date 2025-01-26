import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import {
  getAllUsersController,
  getUserDetailsController,
  createUserController,
  updateUserController,
  deleteUserController,
  signup,
  login,
} from "../controllers/userController";
import {
  getPreferencesController,
  setPreferencesController,
} from "../controllers/preferencesController";
import { authenticate } from "../middleware/authenticate";
import rateLimit from "express-rate-limit";

const router = Router();

// Limitar solicitudes para evitar ataques de fuerza bruta
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 solicitudes por IP
  message:
    "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.",
});

// Definir rutas de autenticación
/**
 * @route POST /api/users/signup
 * @desc Registrar un nuevo usuario
 * @access Público
 */
router.post(
  "/signup",
  authLimiter,
  celebrate({
    body: Joi.object({
      name: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  signup
);

/**
 * @route POST /api/users/login
 * @desc Iniciar sesión de usuario
 * @access Público
 */
router.post(
  "/login",
  authLimiter,
  celebrate({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);

// Definir rutas de usuarios protegidas
/**
 * @route GET /api/users
 * @desc Obtener todos los usuarios
 * @access Privado
 */
router.get("/", getAllUsersController);

/**
 * @route GET /api/users/:userId
 * @desc Obtener detalles de un usuario por ID
 * @access Privado
 */
router.get(
  "/:userId",
  // authenticate,
  celebrate({
    params: Joi.object({
      userId: Joi.string().required(),
    }),
  }),
  getUserDetailsController
);

/**
 * @route POST /api/users
 * @desc Crear un nuevo usuario
 * @access Público
 */
router.post(
  "/",
  celebrate({
    body: Joi.object({
      name: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUserController
);

/**
 * @route PUT /api/users/:userId
 * @desc Actualizar un usuario por ID
 * @access Privado
 */
router.put(
  "/:userId",
  // authenticate,
  celebrate({
    params: Joi.object({
      userId: Joi.string().required(),
    }),
    body: Joi.object({
      name: Joi.string().min(1).optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().optional(),
    }),
  }),
  updateUserController
);

/**
 * @route PUT /api/users/:userId
 * @desc Eliminar un usuario por ID
 * @access Privado
 */
router.put(
  "/delete/:userId",
  // authenticate,
  celebrate({
    params: Joi.object({
      userId: Joi.string().required(),
    }),
  }),
  deleteUserController
);

// Rutas de preferencias
/**
 * @route POST /api/users/preferences
 * @desc Crear o actualizar preferencias de usuario
 * @access Privado
 */
router.post(
  "/preferences",
  // authenticate,
  celebrate({
    body: Joi.object({
      userId: Joi.string().required(),
      teams: Joi.array().items(Joi.string()).required(),
      players: Joi.array().items(Joi.string()).required(),
      playTypes: Joi.array().items(Joi.string()).required(),
    }),
  }),
  setPreferencesController
);

/**
 * @route GET /api/users/preferences/:userId
 * @desc Obtener preferencias de usuario por ID
 * @access Privado
 */
router.get(
  "/preferences/:userId",
  // authenticate,
  celebrate({
    params: Joi.object({
      userId: Joi.string().required(),
    }),
  }),
  getPreferencesController
);

export default router;
