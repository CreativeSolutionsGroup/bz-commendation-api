import { createConnection } from "typeorm"
import Commendation from "../models/commendation";
import EmailList from "../models/emailList";
import Role from "../models/role";
import Team from "../models/team";
import User from "../models/user";

export const initDatabase = async () => {
  const connection = await createConnection({
    type: "mariadb",
    host: process.env.DB_HOST ?? "localhost",
    port: +process.env.DB_PORT ?? 3306,
    username: process.env.DB_USER ?? "root",
    password: process.env.DB_PASS ?? "test",
    database: process.env.DB_DATA ?? "bz",
    entities: [User, Role, Team, EmailList, Commendation],
  });

  return connection;
}