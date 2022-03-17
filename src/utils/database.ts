import { createConnection } from "typeorm"

export const initDatabase = async () => {
  const connection = await createConnection({
    type: "mariadb",
    host: process.env.DB_HOST ?? "localhost",
    port: +process.env.DB_PORT ?? 3306,
    username: process.env.DB_USER ?? "root",
    password: process.env.DB_PASS ?? "test",
    database: process.env.DB_DATA ?? "bz"
  });

  return connection;
}