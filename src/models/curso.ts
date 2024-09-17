import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { CursoEstudiante } from "./cursoEstudiante";
import { Profesor } from "./profesor";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

@Entity({name:"cursos"})
export class Curso extends BaseEntity {

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  @Column()
  nombre: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
  @MaxLength(200, { message: 'La descripción no puede tener más de 200 caracteres' })
  @Column('text')
  descripcion: string;

  @ManyToOne(() => Profesor, (profesor) => profesor.cursos)
  @JoinColumn({ name: 'profesorId' })
  profesor: Profesor;

  @OneToMany(() => CursoEstudiante, (cursoEstudiante) => cursoEstudiante.curso)
  cursoEstudiante: CursoEstudiante[];
  
}
