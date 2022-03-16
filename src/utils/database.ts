import { createConnection } from "typeorm"

export const initDatabase = async () => {
  const connection = await createConnection({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT ?? 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA
  });

  return connection;
}