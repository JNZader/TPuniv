import { Curso } from "../models/curso";
import { BaseService } from "./baseService";
import { DataSource, EntityManager, Like } from "typeorm";
import { CursoEstudiante } from '../models/cursoEstudiante'

export class CursoService extends BaseService<Curso> {
  constructor(dataSource: DataSource) {
    // Llama al constructor de BaseService con la entidad y el dataSource
    super(Curso, dataSource);
  }

  // Obtener todos los cursos con las relaciones definidas
  async findAll(): Promise<Curso[]> {
    return this.repository.find({
      relations: ['profesor'], // Relación con Profesor
    });
  }

  // Obtener un curso por ID con las relaciones definidas
  async findOne(id: number): Promise<Curso | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['profesor'],
    });
  }

  // Crear un nuevo curso
  async create(curso: Partial<Curso>): Promise<Curso> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(Curso);
      const newCurso = repository.create(curso); // Crea una instancia del curso
      return repository.save(newCurso); // Guarda la nueva instancia
    });
  }

  // Actualizar un curso por ID
  async update(id: number, curso: Partial<Curso>): Promise<Curso | null> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(Curso);
      await repository.update(id, curso); // Actualiza el curso
      return repository.findOneBy({ id }); // Retorna el curso actualizado
    });
  }

  // Método para verificar si hay inscripciones asociadas
  private async hasInscripciones(cursoId: number): Promise<boolean> {
    const inscripcionRepository = this.dataSource.getRepository(CursoEstudiante);

    // Espera a que se resuelva la promesa de findOne para obtener el curso
    const curso = await this.findOne(cursoId);

    if (!curso) {
      throw new Error('El curso no existe.');
    }

    // Usa el curso obtenido directamente en el where
    const count = await inscripcionRepository.count({ where: { curso } });

    return count > 0; // Retorna true si hay inscripciones
  }

  // Eliminar un curso por ID
  async delete(id: number): Promise<void> {
    if (await this.hasInscripciones(id)) {
      throw new Error('No se puede eliminar el curso porque tiene inscripciones asociadas.');
    }

    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(Curso);
      await repository.delete(id); // Elimina el curso si no tiene inscripciones
    });
  }

async findByNombre(nombre: string): Promise<Curso[]> {
    return this.repository.find({
      where: { nombre: Like(`%${nombre}%`) },
      relations: ['profesor'],
    });
  }

  async findByDescripcion(descripcion: string): Promise<Curso[]> {
    return this.repository.find({
      where: { descripcion: Like(`%${descripcion}%`) },
      relations: ['profesor'],
    });
  }

  async findByProfesorId(profesorId: number): Promise<Curso[]> {
    return this.repository.find({
      where: { profesor: { id: profesorId } },
      relations: ['profesor'],
    });
  }

}