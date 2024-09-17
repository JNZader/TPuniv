import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity";
import { Curso } from "./curso";
import { IsEmail, IsNotEmpty, IsString, Length, Matches, MaxLength } from "class-validator";

@Entity({name:"profesores"})
export class Profesor extends BaseEntity {

  @Column()
  @IsString({ message: 'El DNI debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El DNI no puede estar vacío' })
  @Length(8, 8, { message: 'El DNI debe tener exactamente 8 caracteres' })
  @Matches(/^[0-9]+$/, { message: 'El DNI debe contener solo dígitos' })
  dni: string;
  
  @Column()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @MaxLength(50, { message: 'El nombre debe tener máximo 50 caracteres' })
  nombre: string;

  @Column()
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío' })
  @MaxLength(50, { message: 'El apellido debe tener máximo 50 caracteres' })
  apellido: string;

  @Column()
  @IsEmail()
  @IsString({ message: 'El email debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  @MaxLength(254, { message: 'El email debe tener máximo 254 caracteres' })
  email: string;
  
  @Column()
  @IsString({ message: 'La profesión debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La profesión no puede estar vacía' })
  @MaxLength(50, { message: 'La profesión debe tener máximo 50 caracteres' })
  profesion: string;

  @Column()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El teléfono no puede estar vacío' })
  @Length(7, 20, { message: 'El teléfono debe tener entre 7 y 20 caracteres' })
  @Matches(/^[0-9]+$/, { message: 'El teléfono debe contener solo dígitos' })
  telefono: string;

  @OneToMany(() => Curso, (curso) => curso.profesor)
  cursos: Curso[];

}
