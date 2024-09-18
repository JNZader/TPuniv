import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, "../models/*.ts")],
  logging: true,
  synchronize: true,
});

async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log("Base de datos inicializada!");
  } catch (err) {
    console.error("Error durante la inicializacion de la base de datos", err);
    throw err;
  }
}

export { initializeDatabase };