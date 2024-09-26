import { CursoEstudiante } from '../models/cursoEstudiante';
import { BaseService } from './baseService';
import { DataSource, EntityManager } from 'typeorm';

export class CursoEstudianteService extends BaseService<CursoEstudiante> {
  constructor(dataSource: DataSource) {
    super(CursoEstudiante, dataSource);
  }

  // Obtener todos los CursoEstudiante con las relaciones definidas
  async findAll(): Promise<CursoEstudiante[]> {
    return this.repository.find({
      relations: ['curso', 'estudiante'], // Relación con Curso y Estudiante
    });
  }

  // Obtener un CursoEstudiante por ID con las relaciones definidas
  async findOne(id: number): Promise<CursoEstudiante | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['curso', 'estudiante'], // Relación con Curso y Estudiante
    });
  }

  // Crear un nuevo CursoEstudiante
  async create(cursoEstudiante: Partial<CursoEstudiante>): Promise<CursoEstudiante> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(CursoEstudiante);
      const newCursoEstudiante = repository.create(cursoEstudiante); // Crea una instancia de CursoEstudiante
      return repository.save(newCursoEstudiante); // Guarda la nueva instancia
    });
  }

  // Actualizar un CursoEstudiante por ID
  async update(id: number, cursoEstudiante: Partial<CursoEstudiante>): Promise<CursoEstudiante | null> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(CursoEstudiante);
      await repository.update(id, cursoEstudiante); // Actualiza el CursoEstudiante
      return repository.findOneBy({ id }); // Retorna el CursoEstudiante actualizado
    });
  }

  // Eliminar un CursoEstudiante por ID
  async delete(id: number): Promise<void> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(CursoEstudiante);
      await repository.delete(id); // Elimina el CursoEstudiante por ID
    });
  }

  // Obtener CursoEstudiante por estudiante ID
  async findByEstudianteId(idEstudiante: number): Promise<CursoEstudiante[]> {
    return this.repository.find({
      where: { estudiante: { id: idEstudiante } },
      relations: ['curso', 'estudiante'],
    });
  }

  // Obtener CursoEstudiante por curso ID
  async findByCursoId(idCurso: number): Promise<CursoEstudiante[]> {
    return this.repository.find({
      where: { curso: { id: idCurso } },
      relations: ['curso', 'estudiante'],
    });
  }

  // Obtener CursoEstudiante por nota
  async findByNota(nota: number): Promise<CursoEstudiante[]> {
    return this.repository.find({ where: { nota }, relations: ['curso', 'estudiante'] });
  }
}
