import { Connection, getConnection } from 'typeorm';
import EmailList from '../models/emailList';
import Team from '../models/team';

export const getTeams = async (db: Connection = getConnection()) => {
  return await db.getRepository(Team).find();
}

export const getTeam = async (id: string, db: Connection = getConnection()) => {
  return await db.getRepository(Team).findOne(id);
}

export const createTeam = async (team: Team, db: Connection = getConnection()) => {
  return await db.getRepository(Team).save(team);
}

export const deleteTeam = async (id: string, db: Connection = getConnection()) => {
  return await db.getRepository(Team).delete(id);
}

export const updateTeam = async (id: string, team: Partial<Team>, db: Connection = getConnection()) => {
  return await db.getRepository(Team).update(id, team);
}

export const getTeamEmailList = async (id: number, db: Connection = getConnection()) => {
  return await db.getRepository(EmailList).find({ relations: ['team'] });
}