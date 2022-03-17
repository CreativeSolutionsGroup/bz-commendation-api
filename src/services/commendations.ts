import { Connection, getConnection } from "typeorm";
import Commendation from "../models/commendation";

export const getCommendation = async (id: string, db: Connection = getConnection()) => {
  return await db.getRepository(Commendation).findOne(id);
}

export const getCommendations = async (db: Connection = getConnection()) => {
  return await db.getRepository(Commendation).find();
}

export const createCommendation = async (commendation: Commendation, db: Connection = getConnection()) => {
  return await db.getRepository(Commendation).save(commendation);
}

export const updateCommendation = async (id: string, commendation: Partial<Commendation>, db: Connection = getConnection()) => {
  return await db.getRepository(Commendation).update(id, commendation);
}

export const deleteCommendation = async (id: string, db: Connection = getConnection()) => {
  return await db.getRepository(Commendation).delete(id);
}

export const getCommendationsByEmail = async (email: string, db: Connection = getConnection()) => {
  return await db.getRepository(Commendation).find({ where: { email } });
}
