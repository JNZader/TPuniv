import { Router } from 'express';
import { CursoController } from '../controllers/CursoController';
import { CursoService } from '../services/CursoService';
import { AppDataSource } from '../database/data-source';
import { ProfesorService } from '../services/ProfesorService';

const router = Router();
const cursoController = new CursoController(
    new CursoService(AppDataSource),
    new ProfesorService(AppDataSource));

router.route('/')
    .get((req, res) => cursoController.getAll(req, res))
    .post((req, res) => cursoController.create(req, res));

router.route('/:id')
    .get((req, res) => cursoController.getOne(req, res))
    .put((req, res) => cursoController.update(req, res))
    .delete((req, res, next) => cursoController.delete(req, res, next));

router.route('/nombre/:nombre')
    .get((req, res) => cursoController.getByNombre(req, res));

router.route('/descripcion/:descripcion')
    .get((req, res) => cursoController.getByDescripcion(req, res));

router.route('/profesor/:profesorId')
    .get((req, res) => cursoController.getByProfesorId(req, res));

export default router;
