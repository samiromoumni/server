import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', err)

  // Handle mongoose validation errors
  if (err.name === 'ValidationError') {
    res.status(400).json({
      message: 'Validation error',
      error: err.message,
    })
    return
  }

  // Handle mongoose cast errors
  if (err.name === 'CastError') {
    res.status(400).json({
      message: 'Invalid ID',
    })
    return
  }

  // Handle mongoose duplicate key errors
  if (err.code === 11000) {
    res.status(400).json({
      message: 'Duplicate field value',
    })
    return
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: 'Invalid token',
    })
    return
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      message: 'Token expired',
    })
    return
  }

  // Default error response
  const statusCode = err.statusCode || 500
  const message = err.message || 'Server error'
  
  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}



