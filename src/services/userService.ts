import {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail as modelGetUserByEmail,
} from "../models/spanner/usersModel";
import { User } from "../models/spanner/usersModel";
import crypto from "crypto";

export const fetchAllUsers = async (): Promise<User[]> => {
  return await getAllUsers();
};

export const fetchUserDetails = async (
  userId: string
): Promise<User | null> => {
  return await getUserById(userId);
};

export const fetchCreateUser = async (
  userData: Omit<User, "id" | "created_at" | "updated_at">
): Promise<User> => {
  const newUser: User = {
    id: crypto.randomUUID(),
    ...userData,
    created_at: new Date().toISOString(),
    updated_at: undefined,
  };
  await createUser(newUser);
  return newUser;
};

export const fetchUpdateUser = async (
  userId: string,
  updates: Partial<Omit<User, "id" | "created_at">>
): Promise<void> => {
  await updateUser(userId, updates);
};

export const fetchDeleteUser = async (userId: string): Promise<void> => {
  await deleteUser(userId);
};

export const fetchGetUserByEmail = async (
  email: string
): Promise<User | null> => {
  return await modelGetUserByEmail(email);
};
