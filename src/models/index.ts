// Aquí irían las definiciones de modelos (Mongo, Sequelize, etc.)

import { Schema, model } from "mongoose";

// Definición del esquema de Mongoose
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Creación del modelo de Mongoose
const User = model("User", userSchema);

export default User;
