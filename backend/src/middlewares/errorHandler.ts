// backend/src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// Tipe kustom untuk error
interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: CustomError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Log error untuk debugging
  console.error(err);

  // Tangani Zod Validation Error
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validasi gagal',
      errors: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
  }

  // Error umum
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Terjadi kesalahan server',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// Custom error untuk berbagai jenis error
export class NotFoundError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

export class ValidationError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}