
# TP Final - Desarrollo de Aplicaciones Web

## Descripción del Proyecto
Este proyecto es el Trabajo Práctico Final de la materia Desarrollo de Aplicaciones Web de la Tecnicatura Universitaria en Desarrollo de Software de la Universidad Gastón Dachary. El objetivo del proyecto es desarrollar una aplicación web que gestione cursos, estudiantes, profesores y las inscripciones de estudiantes en cursos.

## Tecnologías Utilizadas
- **Backend:** Node.js con Express
- **Base de Datos:** MySQL
- **ORM:** TypeORM
- **Validación:** class-validator
- **Otros:** cors, morgan, dotenv
- **Lenguaje:** TypeScript
- **Contenedores:** Docker

## Estructura del Proyecto

```
src/
├── controllers/
│   ├── CursoController.ts
│   ├── CursoEstudianteController.ts
│   ├── EstudianteController.ts
│   ├── ProfesorController.ts
├── models/
│   ├── baseEntity.ts
│   ├── curso.ts
│   ├── cursoEstudiante.ts
│   ├── estudiante.ts
│   ├── profesor.ts
├── routes/
│   ├── cursosRoutes.ts
│   ├── cursoEstudianteRoutes.ts
│   ├── estudianteRoutes.ts
│   ├── profesoresRoutes.ts
├── services/
│   ├── baseService.ts
│   ├── CursoEstudianteService.ts
│   ├── CursoService.ts
│   ├── EstudianteService.ts
│   ├── ProfesorService.ts
├── database/
│   ├── data-source.ts
│   ├── errorHandler.ts
├── app.ts
├── index.ts
├── .env
├── package.json
├── tsconfig.json
```

## Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tpuniv.git
   cd tpuniv
   ```
   
2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Copia el archivo `.env.example` a `.env` y configura las variables de entorno según tu configuración de base de datos y servidor.

4. Ejecutar la aplicación:
   ```bash
   npm run dev
   ```

# Endpoints

## Cursos
- `GET /cursos`: Obtener todos los cursos.
- `GET /cursos/:id`: Obtener un curso por ID.
- `POST /cursos`: Crear un nuevo curso.
- `PUT /cursos/:id`: Actualizar un curso por ID.
- `DELETE /cursos/:id`: Eliminar un curso por ID.
- `GET /cursos/nombre/:nombre`: Obtener cursos por nombre.
- `GET /cursos/descripcion/:descripcion`: Obtener cursos por descripción.
- `GET /cursos/profesor/:profesorId`: Obtener cursos por ID del profesor.

## Estudiantes
- `GET /estudiantes`: Obtener todos los estudiantes.
- `GET /estudiantes/:id`: Obtener un estudiante por ID.
- `POST /estudiantes`: Crear un nuevo estudiante.
- `PUT /estudiantes/:id`: Actualizar un estudiante por ID.
- `DELETE /estudiantes/:id`: Eliminar un estudiante por ID.
- `GET /estudiantes/dni/:dni`: Obtener estudiantes por DNI.
- `GET /estudiantes/nombre/:nombre`: Obtener estudiantes por nombre.
- `GET /estudiantes/apellido/:apellido`: Obtener estudiantes por apellido.
- `GET /estudiantes/email/:email`: Obtener estudiantes por email.

## Profesores
- `GET /profesores`: Obtener todos los profesores.
- `GET /profesores/:id`: Obtener un profesor por ID.
- `POST /profesores`: Crear un nuevo profesor.
- `PUT /profesores/:id`: Actualizar un profesor por ID.
- `DELETE /profesores/:id`: Eliminar un profesor por ID.
- `GET /profesores/dni/:dni`: Obtener profesores por DNI.
- `GET /profesores/nombre/:nombre`: Obtener profesores por nombre.
- `GET /profesores/apellido/:apellido`: Obtener profesores por apellido.
- `GET /profesores/email/:email`: Obtener profesores por email.
- `GET /profesores/profesion/:profesion`: Obtener profesores por profesión.
- `GET /profesores/telefono/:telefono`: Obtener profesores por teléfono.

## Inscripciones (Curso-Estudiante)
- `GET /cursos-estudiantes`: Obtener todas las inscripciones.
- `GET /cursos-estudiantes/:id`: Obtener una inscripción por ID.
- `POST /cursos-estudiantes`: Crear una nueva inscripción.
- `PUT /cursos-estudiantes/:id`: Actualizar una inscripción por ID.
- `DELETE /cursos-estudiantes/:id`: Eliminar una inscripción por ID.
- `GET /cursos-estudiantes/estudiante/:idEstudiante`: Obtener inscripciones por ID de estudiante.
- `GET /cursos-estudiantes/curso/:idCurso`: Obtener inscripciones por ID de curso.
- `GET /cursos-estudiantes/nota/:nota`: Obtener inscripciones por nota.
