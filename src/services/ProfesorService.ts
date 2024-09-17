import { Profesor } from '../models/profesor';
import { BaseService } from './baseService';

export class ProfesorService extends BaseService<Profesor> {
    async findAll(): Promise<Profesor[]> {
        return (await this.execRepository).find();
    }

    async findOne(id: number): Promise<Profesor | null> {
        return (await this.execRepository).findOneBy({ id });
    }

    async create(profesor: Partial<Profesor>): Promise<Profesor> {
        const newProfesor = (await this.execRepository).create(profesor);
        return (await this.execRepository).save(newProfesor);
    }

    async update(id: number, profesor: Partial<Profesor>): Promise<Profesor | null> {
        await (await this.execRepository).update(id, profesor);
        return (await this.execRepository).findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await (await this.execRepository).delete(id);
    }
}