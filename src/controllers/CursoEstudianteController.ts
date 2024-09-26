import { NextFunction, Request, Response } from 'express';
import { CursoEstudianteService } from '../services/CursoEstudianteService';
import { CursoService } from '../services/CursoService';
import { EstudianteService } from '../services/EstudianteService';
import { CursoEstudiante } from '../models/cursoEstudiante';
import { validate } from 'class-validator';

export class CursoEstudianteController {
    constructor(
        private readonly cursoEstudianteService: CursoEstudianteService,
        private readonly cursoService: CursoService,
        private readonly estudianteService: EstudianteService
    ) {}

    async getAll(req: Request, res: Response): Promise<Response> {
        const cursoEstudiantes = await this.cursoEstudianteService.findAll();
        return res.json(cursoEstudiantes);
    }

    async getOne(req: Request, res: Response): Promise<Response> {
        const cursoEstudiante = await this.cursoEstudianteService.findOne(Number(req.params.id));
        if (!cursoEstudiante) {
            return res.status(404).json({ message: 'Curso-Estudiante no encontrado' });
        }
        return res.json(cursoEstudiante);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { cursoId, estudianteId, nota, fecha } = req.body;
    
        if (!cursoId || !estudianteId || !nota || !fecha) {
            return res.status(400).json({ message: "Datos incompletos" });
        }
    
        const curso = await this.cursoService.findOne(cursoId);
        const estudiante = await this.estudianteService.findOne(estudianteId);

        if (!curso || !estudiante) {
            return res.status(400).json({ message: "Curso o Estudiante no encontrado" });
        }

        const cursoEstudianteB = new CursoEstudiante();
        cursoEstudianteB.curso = curso;
        cursoEstudianteB.estudiante = estudiante;
        cursoEstudianteB.nota = parseFloat(nota);  // Asegúrate de que nota sea un número
        cursoEstudianteB.fecha = new Date(fecha);

        const errors = await validate(cursoEstudianteB);
        if (errors.length > 0) {
            return res.status(400).json({ message: "Error de validación", errors });
        }
    
        try {
            const cursoEstudiante = await this.cursoEstudianteService.create(cursoEstudianteB);
            return res.status(201).json(cursoEstudiante);
        } catch (error) {
            console.error('Error al crear inscripción:', error);  // Log del error
            return res.status(500).json({ message: "Error al crear inscripción" });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { cursoId, estudianteId, nota, fecha } = req.body;
        const id = Number(req.params.id);

        // Verificar si el curso y el estudiante existen
        const curso = await this.cursoService.findOne(cursoId);
        const estudiante = await this.estudianteService.findOne(estudianteId);

        if (!curso || !estudiante) {
            return res.status(400).json({ message: 'Curso o Estudiante no encontrado' });
        }

        const cursoEstudianteB = new CursoEstudiante();
        cursoEstudianteB.curso = curso;
        cursoEstudianteB.estudiante = estudiante;
        cursoEstudianteB.nota = parseFloat(nota);  // Asegúrate de que nota sea un número
        cursoEstudianteB.fecha = new Date(fecha);

        const errors = await validate(cursoEstudianteB);

        if (errors.length > 0) {
            return res.status(400).json({ message: "Error de validación", errors });
        }

        const cursoEstudiante = await this.cursoEstudianteService.update(id, cursoEstudianteB);

        if (!cursoEstudiante) {
            return res.status(404).json({ message: 'Curso-Estudiante no encontrado' });
        }
        return res.json(cursoEstudiante);
    }

    async delete(req: Request, res: Response,next: NextFunction) {
        try {
            
            await this.cursoEstudianteService.delete(Number(req.params.id));
            return res.status(204).send();

        } catch (error) {
            
            next(error);
            
        }
    }

    async getByEstudianteId(req: Request, res: Response): Promise<Response> {
        const cursoEstudiantes = await this.cursoEstudianteService.findByEstudianteId(Number(req.params.idEstudiante));
        return res.json(cursoEstudiantes);
    }

    async getByCursoId(req: Request, res: Response): Promise<Response> {
        const cursoEstudiantes = await this.cursoEstudianteService.findByCursoId(Number(req.params.idCurso));
        return res.json(cursoEstudiantes);
    }

    async getByNota(req: Request, res: Response): Promise<Response> {
        const cursoEstudiantes = await this.cursoEstudianteService.findByNota(Number(req.params.nota));
        return res.json(cursoEstudiantes);
    }
}
