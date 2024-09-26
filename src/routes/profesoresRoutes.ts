import { Router } from "express";
import { ProfesorController } from "../controllers/ProfesorController";
import { ProfesorService } from "../services/ProfesorService";
import { AppDataSource } from "../database/data-source";

const router = Router();
const profesorController = new ProfesorController(new ProfesorService(AppDataSource));

router
  .route("/")
  .get((req, res) => profesorController.getAll(req, res))
  .post((req, res) => profesorController.create(req, res));

router
  .route("/:id")
  .get((req, res) => profesorController.getOne(req, res))
  .put((req, res) => profesorController.update(req, res))
  .delete((req, res, next) => profesorController.delete(req, res, next));

router.route("/dni/:dni")
  .get((req, res) => profesorController.getByDni(req, res));

router.route("/nombre/:nombre")
  .get((req, res) => profesorController.getByNombre(req, res));

router.route("/apellido/:apellido")
  .get((req, res) => profesorController.getByApellido(req, res));

router.route("/email/:email")
  .get((req, res) => profesorController.getByEmail(req, res));

router.route("/profesion/:profesion")
  .get((req, res) => profesorController.getByProfesion(req, res));

router.route("/telefono/:telefono")
  .get((req, res) => profesorController.getByTelefono(req, res));

export default router;
