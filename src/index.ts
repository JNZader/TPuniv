import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { AppDataSource } from "./database/data-source";
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error durante la inicializacion de la base de datos", error);
    process.exit(1);
  }
}

async function initializeDatabase() {
  try {
    await createDatabaseIfNotExists();
    await AppDataSource.initialize();
    console.log("Base de datos inicializada!");
  } catch (error) {
    console.error("Error durante la inicializacion de la base de datos", error);
    throw error;
  }
}

async function createDatabaseIfNotExists() {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.BD_PORT || '3306', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    connection.end();
  } catch (error) {
    console.error('Error al crear la base de datos:', error);
  }
}

main();