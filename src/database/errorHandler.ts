import { NextFunction, Request, Response } from 'express';
import { QueryFailedError, EntityNotFoundError } from 'typeorm';
import { ValidationError } from 'class-validator';

export function errorHandlerMiddleware(
    err: unknown, // Este es el error que ocurre en cualquier parte de la aplicación
    req: Request, 
    res: Response, 
    next: NextFunction // Permite pasar el error a otro middleware si no se maneja aquí
) {
    console.error("Error:", err); // Registro del error
    
    if (err instanceof QueryFailedError) {
        const errorObj = {
            code: err.driverError?.code || "UNKNOWN_ERROR",
            message: "Error en la consulta de la base de datos.",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined,
        };
        return res.status(400).json(errorObj);
    }

    if (err instanceof EntityNotFoundError) {
        const errorObj = {
            message: "Recurso no encontrado.",
            details: process.env.NODE_ENV === 'development' ? err.message : undefined,
        };
        return res.status(404).json(errorObj);
    }

    if (err instanceof ValidationError) {
        const errorObj = {
            message: "Error de validación.",
            errors: err.constraints, // Contiene los errores de validación
        };
        return res.status(400).json(errorObj);
    }

    if (err instanceof Error) {
        const errorObj = {
            message: "Error Interno del Servidor",
            details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        };
        return res.status(500).json(errorObj);
    }

    // Manejo de otros tipos de errores no previstos
    return res.status(500).json({ message: "Ocurrió un error inesperado." });
}
