import { Connection, getConnection } from "typeorm";
import Commendation from "../models/commendation";

export const getCommendation = async (id: string, db: Connection = getConnection()) => {
  return await db.manager.findOne(Commendation, id);
}

export const getCommendations = async (db: Connection = getConnection()) => {
  return await db.manager.find(Commendation);
}

export const createCommendation = async (commendation: Commendation, db: Connection = getConnection()) => {
  return await db.manager.save(Commendation, commendation);
}

export const updateCommendation = async (commendation: Partial<Commendation>, db: Connection = getConnection()) => {
  return await db.manager.save(Commendation, commendation);
}

export const deleteCommendation = async (id: string, db: Connection = getConnection()) => {
  return await db.manager.delete(Commendation, id);
}

export const getCommendationsByEmail = async (email: string, db: Connection = getConnection()) => {
  return await db.manager.find(Commendation, {
    where: {
      toEmail: email
    }
  });
}
