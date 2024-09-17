import { createConnection } from 'mysql2/promise';
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

async function createDatabaseIfNotExists() {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST,
      port:parseInt(process.env.BD_PORT || '3306', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    connection.end();
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
  }
}

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, "../models/*.ts")],
  logging: true,
  synchronize: true,
});

async function initializeDatabase() {
  await createDatabaseIfNotExists();
  await AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos inicializada!");
  })
  .catch((err) => {
    console.error("Error durante la inicializacion de la base de datos", err);
    throw err;
  });
}
