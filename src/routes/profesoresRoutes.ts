import { Router } from "express";
import { ProfesorController } from "../controllers/ProfesorController";
import { ProfesorService } from "../services/ProfesorService";
import { Profesor } from "../models/profesor";
import { AppDataSource } from "../database/data-source";

const router = Router();
const profesorController = new ProfesorController(new ProfesorService(Profesor,AppDataSource));

router
  .route("/")
  .get((req, res) => profesorController.getAll(req, res))
  .post((req, res) => profesorController.create(req, res));

router
  .route("/:id")
  .get((req, res) => profesorController.getOne(req, res))
  .put((req, res) => profesorController.update(req, res))
  .delete((req, res) => profesorController.delete(req, res));

export default router;
