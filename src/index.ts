import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import { errorHandler } from './middleware/errorHandler.js'
import packageRoutes from './routes/packageRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000

// Middleware
app.use(helmet())

// CORS configuration - allow multiple origins
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map(url => url.trim())
  : [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://client-theta-sand-52.vercel.app',
    ]

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    // Allow if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    
    // In production, allow all origins (for flexibility)
    if (process.env.NODE_ENV === 'production') {
      return callback(null, true)
    }
    
    // Otherwise, reject
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: 'Reliqua Travel API',
    version: '1.0.0',
    endpoints: {
      packages: '/api/packages',
      reservations: '/api/reservations',
      contact: '/api/contact',
      gallery: '/api/gallery',
      auth: '/api/auth',
      health: '/api/health',
    },
  })
})

// Routes
app.use('/api/packages', packageRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/auth', authRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: {
      packages: '/api/packages',
      reservations: '/api/reservations',
      contact: '/api/contact',
      gallery: '/api/gallery',
      auth: '/api/auth',
      health: '/api/health',
    },
  })
})

// Error handling
app.use(errorHandler)

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  })


