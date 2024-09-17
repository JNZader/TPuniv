import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { CursoEstudiante } from "./cursoEstudiante";
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

@Entity({name:"estudiantes"})
export class Estudiante extends BaseEntity {

  @Column()
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres' })
  @Matches(/^[0-9]+$/, { message: 'El DNI debe contener solo dígitos' })
  dni: string;

  @Column()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  nombre: string;

  @Column()
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @Length(1, 50, { message: 'El apellido debe tener entre 1 y 50 caracteres' })
  apellido: string;

  @Column()
  @IsEmail()
  @IsNotEmpty({message: 'El campo "email" no puede estar vacío.'})
  @MaxLength(100, {message: 'El campo "email" no puede tener más de 100 caracteres.'})
  email: string;

  @OneToMany(
    () => CursoEstudiante,
    (cursoEstudiante) => cursoEstudiante.estudiante
  )
  cursosEstudiante: CursoEstudiante[];

}
