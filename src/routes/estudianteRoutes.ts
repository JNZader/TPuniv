import { Router } from "express";
import { EstudianteController } from "../controllers/EstudianteController";
import { EstudianteService } from "../services/EstudianteService";
import { AppDataSource } from "../database/data-source";

const router = Router();
const estudianteController = new EstudianteController(new EstudianteService(AppDataSource));

router
  .route("/")
  .get((req, res) => estudianteController.getAll(req, res))
  .post((req, res) => estudianteController.create(req, res));

router
  .route("/:id")
  .get((req, res) => estudianteController.getOne(req, res))
  .put((req, res) => estudianteController.update(req, res))
  .delete((req, res, next) => estudianteController.delete(req, res, next));

router.route("/dni/:dni")
  .get((req, res) => estudianteController.getByDni(req, res));

router.route("/nombre/:nombre")
  .get((req, res) => estudianteController.getByNombre(req, res));

router.route("/apellido/:apellido")
  .get((req, res) => estudianteController.getByApellido(req, res));

router.route("/email/:email")
  .get((req, res) => estudianteController.getByEmail(req, res));

export default router;
