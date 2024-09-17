import { Router } from "express";
import { CursoEstudianteController } from "../controllers/CursoEstudianteController";
import { CursoEstudianteService } from "../services/CursoEstudianteService";
import { CursoEstudiante } from "../models/cursoEstudiante";
import { AppDataSource } from "../database/data-source";
import { CursoService } from "../services/CursoService";
import { Curso } from "../models/curso";
import { EstudianteService } from "../services/EstudianteService";
import { Estudiante } from "../models/estudiante";

const router = Router();
const cursoEstudianteController = new CursoEstudianteController(
  new CursoEstudianteService(CursoEstudiante,AppDataSource),
  new CursoService(Curso,AppDataSource),
  new EstudianteService(Estudiante,AppDataSource)
);

router
  .route("/")
  .get((req, res) => cursoEstudianteController.getAll(req, res))
  .post((req, res) => cursoEstudianteController.create(req, res));

router
  .route("/:id")
  .get((req, res) => cursoEstudianteController.getOne(req, res))
  .put((req, res) => cursoEstudianteController.update(req, res))
  .delete((req, res) => cursoEstudianteController.delete(req, res));

router
  .route("/estudiante/:idEstudiante")
  .get((req, res) => cursoEstudianteController.getByEstudianteId(req, res));

router
  .route("/curso/:idCurso")
  .get((req, res) => cursoEstudianteController.getByCursoId(req, res));

router
  .route("/nota/:nota")
  .get((req, res) => cursoEstudianteController.getByNota(req, res));

export default router;
