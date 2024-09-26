import { Estudiante } from '../models/estudiante';
import { CursoEstudiante } from '../models/cursoEstudiante';
import { BaseService } from './baseService';
import { DataSource, EntityManager, Like } from 'typeorm';

export class EstudianteService extends BaseService<Estudiante> {
  constructor(dataSource: DataSource) {
    super(Estudiante, dataSource);
  }

  // Obtener todos los estudiantes
  async findAll(): Promise<Estudiante[]> {
    return this.repository.find(); // No hay relaciones a cargar en este caso
  }

  // Obtener un estudiante por ID
  async findOne(id: number): Promise<Estudiante | null> {
    return this.repository.findOneBy({ id });
  }

  // Crear un nuevo estudiante
  async create(estudiante: Partial<Estudiante>): Promise<Estudiante> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(Estudiante);
      const newEstudiante = repository.create(estudiante); // Crea una instancia del estudiante
      return repository.save(newEstudiante); // Guarda la nueva instancia
    });
  }

  // Actualizar un estudiante por ID
  async update(id: number, estudiante: Partial<Estudiante>): Promise<Estudiante | null> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(Estudiante);
      await repository.update(id, estudiante); // Actualiza el estudiante
      return repository.findOneBy({ id }); // Retorna el estudiante actualizado
    });
  }

  // Verificar si el estudiante tiene cursos asociados
  private async hasCursos(estudianteId: number): Promise<boolean> {
    const cursoEstudianteRepository = this.dataSource.getRepository(CursoEstudiante);

    // Contar las inscripciones del estudiante
    const count = await cursoEstudianteRepository.count({ where: { estudiante: { id: estudianteId } } });

    return count > 0; // Retorna true si el estudiante tiene cursos asociados
  }

  // Eliminar un estudiante por ID
  async delete(id: number): Promise<void> {
    if (await this.hasCursos(id)) {
      throw new Error('No se puede eliminar el estudiante porque tiene cursos asociados.');
    }

    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(Estudiante);
      await repository.delete(id); // Elimina el estudiante si no tiene cursos asociados
    });
  }

  async findByDni(dni: string): Promise<Estudiante[]> {
    return this.repository.find({
      where: { dni: Like(`%${dni}%`) }
    });
  }

  async findByNombre(nombre: string): Promise<Estudiante[]> {
    return this.repository.find({
      where: { nombre: Like(`%${nombre}%`) }
    });
  }

  async findByApellido(apellido: string): Promise<Estudiante[]> {
    return this.repository.find({
      where: { apellido: Like(`%${apellido}%`) }
    });
  }

  async findByEmail(email: string): Promise<Estudiante[]> {
    return this.repository.find({
      where: { email: Like(`%${email}%`) }
    });
  }
}

