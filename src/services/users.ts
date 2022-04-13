import { Connection, getConnection } from "typeorm";
import User from "../models/user";

export const getUsers = async (db: Connection = getConnection()) => {
  return await db.getRepository(User).find({order: { name: "ASC" }, relations: ['role', 'team'] });
}

/**
 * Gets a user by their auto increment ID
 * @param id The id of the user to find.
 */
export const getUser = async (id: string, db: Connection = getConnection()) => {
  return await db.getRepository(User).findOne(id, { relations: ['role', 'team'] });
}

export const updateUser = async (id: string, user: Partial<User>, db: Connection = getConnection()) => {
  return await db.getRepository(User).update(id, user);
}

export const createUser = async (user: User, db: Connection = getConnection()) => {
  return await db.getRepository(User).save(user);
}

export const deleteUser = async (id: string, db: Connection = getConnection()) => {
  return await db.getRepository(User).delete(id);
}

/**
 * Checks to see if a user exists by their email.
 * This is a strict check to see if there is only one user by that email.
 * 
 * @param email The email of the user
 */
export const userExistsByEmail = async (email: string, db: Connection = getConnection()) => {
  const userCount = await db.getRepository(User).count({ email });
  return userCount === 1;
}