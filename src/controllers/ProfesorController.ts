import { Request, Response } from 'express';
import { ProfesorService } from '../services/ProfesorService';
import { validate } from 'class-validator';
import { Profesor } from '../models/profesor';

export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) {}

    async getAll(req: Request, res: Response): Promise<Response> {
        const profesores = await this.profesorService.findAll();
        return res.json(profesores);
    }

    async getOne(req: Request, res: Response): Promise<Response> {
        const profesor = await this.profesorService.findOne(Number(req.params.id));
        if (!profesor) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        return res.json(profesor);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const profesor = new Profesor();

        profesor.dni = req.body.dni;
        profesor.nombre = req.body.nombre;
        profesor.apellido = req.body.apellido;
        profesor.email = req.body.email;
        profesor.profesion = req.body.profesion;
        profesor.telefono = req.body.telefono;

        const errors = await validate(profesor);

        if (errors.length > 0) {
            return res.status(400).json({ message: "Error de validación", errors });
        }

        const profesor1 = await this.profesorService.create(req.body);
        return res.status(201).json(profesor1);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const profesor = new Profesor();

        profesor.id = req.body.id;
        profesor.dni = req.body.dni;
        profesor.nombre = req.body.nombre;
        profesor.apellido = req.body.apellido;
        profesor.email = req.body.email;
        profesor.profesion = req.body.profesion;
        profesor.telefono = req.body.telefono;

        const errors = await validate(profesor);

        if (errors.length > 0) {
            return res.status(400).json({ message: "Error de validación", errors });
        }

        const profesor1 = await this.profesorService.update(Number(req.params.id), req.body);
        if (!profesor1) {
            return res.status(404).json({ message: 'Profesor no encontrado' });
        }
        return res.json(profesor1);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        await this.profesorService.delete(Number(req.params.id));
        return res.status(204).send();
    }
}
