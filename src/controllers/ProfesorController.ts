import { Request, Response, NextFunction } from 'express';
import { ProfesorService } from '../services/ProfesorService';
import { validate } from 'class-validator';
import { Profesor } from '../models/profesor';

export class ProfesorController {
    constructor(private readonly profesorService: ProfesorService) { }

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

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const profesorId = Number(req.params.id);
            await this.profesorService.delete(profesorId);
            return res.status(200).json({ message: 'Profesor eliminado correctamente.' });
        } catch (error) {
            next(error); // Esto pasa el error al middleware de manejo de errores
        }
    }
    async getByDni(req: Request, res: Response): Promise<Response> {
        const dni = req.params.dni;
        if (!dni) {
            return res.status(400).json({ message: 'El DNI es requerido' });
        }
        const profesores = await this.profesorService.findByDni(dni);
        return res.json(profesores);
    }

    async getByNombre(req: Request, res: Response): Promise<Response> {
        const nombre = req.params.nombre;
        if (!nombre) {
            return res.status(400).json({ message: 'El nombre es requerido' });
        }
        const profesores = await this.profesorService.findByNombre(nombre);
        return res.json(profesores);
    }

    async getByApellido(req: Request, res: Response): Promise<Response> {
        const apellido = req.params.apellido;
        if (!apellido) {
            return res.status(400).json({ message: 'El apellido es requerido' });
        }
        const profesores = await this.profesorService.findByApellido(apellido);
        return res.json(profesores);
    }

    async getByEmail(req: Request, res: Response): Promise<Response> {
        const email = req.params.email;
        if (!email) {
            return res.status(400).json({ message: 'El email es requerido' });
        }
        const profesores = await this.profesorService.findByEmail(email);
        return res.json(profesores);
    }

    async getByProfesion(req: Request, res: Response): Promise<Response> {
        const profesion = req.params.profesion;
        if (!profesion) {
            return res.status(400).json({ message: 'La profesión es requerida' });
        }
        const profesores = await this.profesorService.findByProfesion(profesion);
        return res.json(profesores);
    }

    async getByTelefono(req: Request, res: Response): Promise<Response> {
        const telefono = req.params.telefono;
        if (!telefono) {
            return res.status(400).json({ message: 'El teléfono es requerido' });
        }
        const profesores = await this.profesorService.findByTelefono(telefono);
        return res.json(profesores);
    }
}
