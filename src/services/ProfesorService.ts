import { Profesor } from '../models/profesor';
import { Curso } from '../models/curso';
import { BaseService } from './baseService';
import { DataSource, EntityManager, Like } from 'typeorm';

export class ProfesorService extends BaseService<Profesor> {
  constructor(dataSource: DataSource) {
    super(Profesor, dataSource);
  }

  // Obtener todos los profesores
  async findAll(): Promise<Profesor[]> {
    return this.repository.find(); // No hay relaciones a cargar en este caso
  }

  // Obtener un profesor por ID
  async findOne(id: number): Promise<Profesor | null> {
    return this.repository.findOneBy({ id });
  }

  // Crear un nuevo profesor
  async create(profesor: Partial<Profesor>): Promise<Profesor> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(Profesor);
      const newProfesor = repository.create(profesor); // Crea una instancia del profesor
      return repository.save(newProfesor); // Guarda la nueva instancia
    });
  }

  // Actualizar un profesor por ID
  async update(id: number, profesor: Partial<Profesor>): Promise<Profesor | null> {
    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(Profesor);
      await repository.update(id, profesor); // Actualiza el profesor
      return repository.findOneBy({ id }); // Retorna el profesor actualizado
    });
  }

  // Método para verificar si un profesor tiene cursos asociados
  private async hasCursos(profesorId: number): Promise<boolean> {
    const cursoRepository = this.dataSource.getRepository(Curso);
    
    // Verificar si hay cursos asociados al profesor
    const count = await cursoRepository.count({ where: { profesor: { id: profesorId } } });
    
    return count > 0; // Retorna true si hay cursos asociados
  }

  // Eliminar un profesor por ID
  async delete(id: number): Promise<void> {
    if (await this.hasCursos(id)) {
      throw new Error('No se puede eliminar el profesor porque tiene cursos asociados.');
    }

    return this.dataSource.transaction(async (entityManager: EntityManager) => {
      const repository = entityManager.getRepository(Profesor);
      await repository.delete(id); // Elimina el profesor si no tiene cursos asociados
    });
  }
  async findByDni(dni: string): Promise<Profesor[]> {
    return this.repository.find({
      where: { dni: Like(`%${dni}%`) }
    });
  }

  async findByNombre(nombre: string): Promise<Profesor[]> {
    return this.repository.find({
      where: { nombre: Like(`%${nombre}%`) }
    });
  }

  async findByApellido(apellido: string): Promise<Profesor[]> {
    return this.repository.find({
      where: { apellido: Like(`%${apellido}%`) }
    });
  }

  async findByEmail(email: string): Promise<Profesor[]> {
    return this.repository.find({
      where: { email: Like(`%${email}%`) }
    });
  }

  async findByProfesion(profesion: string): Promise<Profesor[]> {
    return this.repository.find({
      where: { profesion: Like(`%${profesion}%`) }
    });
  }

  async findByTelefono(telefono: string): Promise<Profesor[]> {
    return this.repository.find({
      where: { telefono: Like(`%${telefono}%`) }
    });
  }
}
