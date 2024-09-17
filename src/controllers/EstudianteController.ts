import { Request, Response } from 'express';
import { EstudianteService } from '../services/EstudianteService';
import { validate } from 'class-validator';
import { Estudiante } from '../models/estudiante';

export class EstudianteController {
    constructor(private readonly estudianteService: EstudianteService) {}

    async getAll(req: Request, res: Response): Promise<Response> {
        const estudiantes = await this.estudianteService.findAll();
        return res.json(estudiantes);
    }

    async getOne(req: Request, res: Response): Promise<Response> {
        const estudiante = await this.estudianteService.findOne(Number(req.params.id));
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        return res.json(estudiante);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const estudiante = new Estudiante();

        estudiante.dni = req.body.dni;
        estudiante.nombre = req.body.nombre;
        estudiante.apellido = req.body.apellido;
        estudiante.email = req.body.email;

        const errors = await validate(estudiante);

        if (errors.length > 0) {
            return res.status(400).json({ message: "Error de validación", errors });
        }

        const estudiante1 = await this.estudianteService.create(req.body);
        return res.status(201).json(estudiante1);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const estudiante = new Estudiante();

        estudiante.id = req.body.id;
        estudiante.dni = req.body.dni;
        estudiante.nombre = req.body.nombre;
        estudiante.apellido = req.body.apellido;
        estudiante.email = req.body.email;

        const errors = await validate(estudiante);

        if (errors.length > 0) {
            return res.status(400).json({ message: "Error de validación", errors });
        }

        const estudiante1 = await this.estudianteService.update(Number(req.params.id), req.body);
        if (!estudiante1) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        return res.json(estudiante1);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        await this.estudianteService.delete(Number(req.params.id));
        return res.status(204).send();
    }
}
