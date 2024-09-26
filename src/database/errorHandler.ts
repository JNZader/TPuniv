import { NextFunction, Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';
import { ValidationError } from 'class-validator';

export function errorHandlerMiddleware(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error("Error:", err);

    // Manejar errores de consultas a la base de datos
    if (err instanceof QueryFailedError) {
        return res.status(400).json({
            code: err.driverError?.code || "UNKNOWN_ERROR",
            message: "Error en la consulta de la base de datos.",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
    }

    // Manejar errores de entidad no encontrada
    if (err instanceof EntityNotFoundError) {
        return res.status(404).json({
            message: "Recurso no encontrado.",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined,
        });
    }

    // Manejar errores de validación
    if (Array.isArray(err) && err[0] instanceof ValidationError) {
        const formattedErrors = err.map((validationError) => ({
            property: validationError.property,
            constraints: validationError.constraints,
        }));
        return res.status(400).json({
            message: "Errores de validación.",
            errors: formattedErrors,
        });
    }

    // Manejar errores personalizados (profesor con cursos asociados)
    if (err instanceof Error && err.message.includes("cursos asociados")) {
        return res.status(409).json({
            message: err.message,
        });
    }

    // Manejar otros errores genéricos
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Error Interno del Servidor",
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        });
    }

    // Manejo de otros tipos de errores no previstos
    return res.status(500).json({ message: "Ocurrió un error inesperado." });
}
