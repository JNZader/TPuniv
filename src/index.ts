import * as dotenv from 'dotenv';
import { initializeDatabase } from "./database/data-source";
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


main();