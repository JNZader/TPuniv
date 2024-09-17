import { Router } from 'express';
import { CursoController } from '../controllers/CursoController';
import { CursoService } from '../services/CursoService';
import { Curso } from '../models/curso';
import { AppDataSource } from '../database/data-source';
import { ProfesorService } from '../services/ProfesorService';
import { Profesor } from '../models/profesor';

const router = Router();
const cursoController = new CursoController(
    new CursoService(Curso,AppDataSource),
    new ProfesorService(Profesor,AppDataSource));

router.route('/')
    .get((req, res) => cursoController.getAll(req, res))
    .post((req, res) => cursoController.create(req, res));

router.route('/:id')
    .get((req, res) => cursoController.getOne(req, res))
    .put((req, res) => cursoController.update(req, res))
    .delete((req, res) => cursoController.delete(req, res));

export default router;
