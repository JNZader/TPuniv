import { Estudiante } from '../models/estudiante';
import { BaseService } from './baseService';

export class EstudianteService extends BaseService<Estudiante> {
    async findAll(): Promise<Estudiante[]> {
        return (await this.execRepository).find();
    }

    async findOne(id: number): Promise<Estudiante | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async create(estudiante: Partial<Estudiante>): Promise<Estudiante> {
        const newEstudiante = (await this.execRepository).create(estudiante);
        return (await this.execRepository).save(newEstudiante);
    }

    async update(id: number, estudiante: Partial<Estudiante>): Promise<Estudiante | null> {
        await (await this.execRepository).update(id, estudiante);
        return (await this.execRepository).findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await (await this.execRepository).delete(id);
    }
}