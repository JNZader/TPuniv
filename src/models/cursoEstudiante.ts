import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Curso } from "./curso";
import { Estudiante } from "./estudiante";
import { IsDate, IsNumber, IsPositive, Max } from "class-validator";

@Entity({name:"inscripciones"})
export class CursoEstudiante extends BaseEntity {

  @Column('decimal')
  @IsNumber()
  @IsPositive({message: 'La nota debe ser un número positivo.'})
  @Max(10, {message: 'La nota no puede ser mayor a 10.'})
  nota: number;

  @Column("date")
  @IsDate({message: 'El campo "fecha" debe ser una fecha válida.'})
  fecha: Date;

  @ManyToOne(() => Curso, curso => curso.cursoEstudiante)
  curso: Curso;

  @ManyToOne(() => Estudiante, estudiante => estudiante.cursosEstudiante)
  estudiante: Estudiante;

}
