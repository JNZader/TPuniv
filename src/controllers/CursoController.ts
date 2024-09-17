import { Request, Response } from 'express';
import { CursoService } from '../services/CursoService';
import { validate } from 'class-validator';
import { Curso } from '../models/curso';
import { ProfesorService } from '../services/ProfesorService'; // Importar el servicio de profesor

export class CursoController {
    constructor(
        private readonly cursoService: CursoService,
        private readonly profesorService: ProfesorService // Inyectar el servicio de profesor
    ) {}

    async getAll(req: Request, res: Response): Promise<Response> {
        const cursos = await this.cursoService.findAll();
        return res.json(cursos);
    }

    async getOne(req: Request, res: Response): Promise<Response> {
        const curso = await this.cursoService.findOne(Number(req.params.id));
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        return res.json(curso);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const curso = new Curso();

        // Buscar el profesor a partir del ID que llega en el cuerpo de la solicitud
        const profesor = await this.profesorService.findOne(req.body.profesorId);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        // Asignar datos al curso
        curso.nombre = req.body.nombre;
        curso.descripcion = req.body.descripcion;
        curso.profesor = profesor;

        // Validar el curso
        const errors = await validate(curso);
        if (errors.length > 0) {
            return res.status(400).json({ message: "Error de validación", errors });
        }

        const nuevoCurso = await this.cursoService.create(curso);
        return res.status(201).json(nuevoCurso);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const curso = await this.cursoService.findOne(Number(req.params.id));
        if (!curso) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }

        // Buscar el profesor actualizado
        const profesor = await this.profesorService.findOne(req.body.profesorId);
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }

        // Actualizar los datos del curso
        curso.nombre = req.body.nombre;
        curso.descripcion = req.body.descripcion;
        curso.profesor = profesor;

        const errors = await validate(curso);
        if (errors.length > 0) {
            return res.status(400).json({ message: "Error de validación", errors });
        }

        const cursoActualizado = await this.cursoService.update(Number(req.params.id), curso);
        return res.json(cursoActualizado);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        await this.cursoService.delete(Number(req.params.id));
        return res.status(204).send();
    }
}
