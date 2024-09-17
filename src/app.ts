import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cursoRoutes from './routes/cursosRoutes';
import cursoEstudianteRoutes from './routes/cursoEstudianteRoutes';
import estudianteRoutes from './routes/estudianteRoutes';
import profesorRoutes from './routes/profesoresRoutes';
import { errorHandlerMiddleware } from './database/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Rutas
app.use('/cursos', cursoRoutes);
app.use('/cursos-estudiantes', cursoEstudianteRoutes);
app.use('/estudiantes', estudianteRoutes);
app.use('/profesores', profesorRoutes);

// Middleware de manejo de errores
app.use(errorHandlerMiddleware);

export default app;