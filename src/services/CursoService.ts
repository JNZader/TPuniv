import { Curso } from "../models/curso";
import { BaseService } from "./baseService";

export class CursoService extends BaseService<Curso> {
  async findAll(): Promise<Curso[]> {
    return (await this.execRepository).find({
      relations: ['profesor'],
  });;
  }

  async findOne(id: number): Promise<Curso | null> {
    return (await this.execRepository).findOne({
      where: { id },
      relations: ['profesor'], 
    });
  }

  async create(curso: Partial<Curso>): Promise<Curso> {
    const newCurso = (await this.execRepository).create(curso);
    return (await this.execRepository).save(newCurso);
  }

  async update(id: number, curso: Partial<Curso>): Promise<Curso | null> {
    await (await this.execRepository).update(id, curso);
    return (await this.execRepository).findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await (await this.execRepository).delete(id);
  }
}
