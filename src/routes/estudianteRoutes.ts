import { Router } from "express";
import { EstudianteController } from "../controllers/EstudianteController";
import { EstudianteService } from "../services/EstudianteService";
import { Estudiante } from "../models/estudiante";
import { AppDataSource } from "../database/data-source";

const router = Router();
const estudianteController = new EstudianteController(new EstudianteService(Estudiante,AppDataSource));

router
  .route("/")
  .get((req, res) => estudianteController.getAll(req, res))
  .post((req, res) => estudianteController.create(req, res));

router
  .route("/:id")
  .get((req, res) => estudianteController.getOne(req, res))
  .put((req, res) => estudianteController.update(req, res))
  .delete((req, res) => estudianteController.delete(req, res));

export default router;
